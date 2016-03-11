require 'yaml'

require 'alces/tools/ssl_configurator'
require 'daemon_client'

class Api::V1::ClustersController < ApplicationController
  rescue_from DaemonClient::ConnError, with: :daemon_connection_error_handler

  def index
    clusters_config = overall_config[:clusters]
    clusters_config.each do |cluster|
      authentication = authentications[cluster[:ip]]
      if authentication
        cluster[:authenticated_username] = authentication
      end
    end

    render json: overall_config.to_json
  end


  def authenticate
    params.require(:username)
    params.require(:password)
    unless cluster_config
      handle_error 'unknown_cluster', :not_found and return
    end

    if auth_response
      authentications[params[:ip]] = params[:username]
      render json: {success: true}
    else
      handle_error 'invalid_credentials', :unauthorized
    end
  end

  def logout
    authentications.delete(params[:ip])
  end

  def sessions
    username = authentications[params[:ip]]
    unless username
      handle_error 'not_authenticated', :unauthorized and return
    end

    user_sessions = sessions_for_response(username)
    render json: user_sessions
  end

  private

  def daemon_connection_error_handler(exception)
    logger.error exception
    exception.backtrace.each { |line| logger.error line }
    handle_error 'daemon_unavailable', :bad_gateway
  end

  def authentications
    unless session[:authentications]
      session[:authentications] = {}
    end
    session[:authentications]
  end

  def auth_response
    daemon.authenticate?(params[:username], params[:password])
  end

  def daemon
    DaemonClient::Connection.new(connection_opts)
  end

  def connection_opts
    cluster_daemon_address = "#{params[:ip]}:#{cluster_config[:auth_port]}"
    {
      address: cluster_daemon_address,
      timeout: cluster_config[:timeout],
      ssl_config: cluster_config[:ssl] ? ssl_config : nil
    }
  end

  def ssl_config
    # Adapted from similar code in ASM `config/initializers/config.rb`.
    Class.new do
      include Alces::Tools::SSLConfigurator

      def initialize(cluster_config)
        # Make the outer controller's cluster config available within this
        # class.
        @cluster_config = cluster_config
      end

      def ssl_verify_mode
        if @cluster_config[:ssl_connection][:verify] == false
          OpenSSL::SSL::VERIFY_NONE
        else
          OpenSSL::SSL::VERIFY_PEER | OpenSSL::SSL::VERIFY_FAIL_IF_NO_PEER_CERT
        end
      end

      def ssl
        ssl_opts = @cluster_config[:ssl_connection].dup
        Alces::Tools::SSLConfigurator::Configuration.new(
          root: ssl_opts[:root],
          certificate: ssl_opts[:certificate],
          key: ssl_opts[:key],
          ca: ssl_opts[:ca]
        )
      end
    end.new(cluster_config).ssl_config
  end


  def sessions_for_response(username)
    opts = {
      :handler => 'Alces::AccessManagerDaemon::SessionsHandler',
      :username => username
    }
    wrapper = DaemonClient::Wrapper.new(daemon, opts)
    wrapper.sessions_for(username)
  end

  def config_file
    Rails.configuration.x.config_file
  end

  def overall_config
    load_config.tap do |config|
      config[:clusters] ||= []
    end
  end

  def load_config
    @config ||= YAML.load_file(config_file).with_indifferent_access
  end

  def cluster_config
    clusters_config = overall_config[:clusters]
    cluster_configs_matching_ip = clusters_config.select { |config| config[:ip] == params[:ip] }
    if cluster_configs_matching_ip.present?
      cluster_configs_matching_ip[0]
    else
      false
    end
  end

  def handle_error(message, status)
    render json: {success: false, error: message}, status: status
  end
end
