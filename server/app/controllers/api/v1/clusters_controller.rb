require 'yaml'

require 'alces/tools/ssl_configurator'
require 'daemon_client'

class Api::V1::ClustersController < ApplicationController
  rescue_from DaemonClient::ConnError, with: :daemon_connection_error_handler
  rescue_from DaemonClient::TimeoutError, with: :daemon_timeout_error_handler

  before_action :check_cluster_authentication, only: [:sessions, :launch_session, :vpn_config]

  # Note: currently this action returns everything in the config file, not just
  # the clusters.
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

  def register
    # TODO:
    # - Maybe we should do some more thorough validation of Json params here?
    #
    # - The process of loading the config, converting to indifferent access
    #   hash, and dumping again, leaves values in config file stating that they
    #   should be instantiated as HashWithIndifferentAccess; which doesn't seem
    #   to effect anything but looks ugly and potentially confusing.
    #
    # - Handle requests for clusters we already have in config; currently this
    #   causes them to be added to config causing issues for client.

    new_config = load_config.tap do |config|
      new_cluster_config = Hash[params[:cluster].tap do |cluster|
        # Convert auth port to int.
        # TODO: Converting to int seems to be required to make test pass, even
        # though requesting in Json format with ints included - I don't
        # understand why.
        cluster[:auth_port] = cluster[:auth_port].to_i
      end]
      config[:clusters] << new_cluster_config
    end
    write_config(new_config)
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

  def ping
    responded = begin
      daemon.ping
    rescue DaemonClient::ConnError
      false
    end

    render json: {available: responded}
  end

  def logout
    authentications.delete(params[:ip])
  end

  def sessions
    render json: {success: true, **sessions_info}
  end

  def launch_session
    # Override config file timeout with a large value; launching a session can
    # take a long time but this is OK as this action is only called
    # asynchronously and we provide UI feedback.
    @connection_opts = connection_opts.merge({timeout: 60})

    request_compute_node = params[:node_type] === 'compute'
    launch_response = launch_session_for_user(params[:session_type], request_compute_node)

    if launch_response === true
      render json: {success: true, **sessions_info}
    else
      render json: {success: false, launch_response: launch_response}
    end
  end

  def vpn_config
    vpn_config_archive = daemon_sessions_wrapper.vpn_config
    send_data vpn_config_archive,
      filename: "#{cluster_config[:name]}-vpn.tar.gz",
      type: 'application/x-tar'
  end

  private

  def daemon_connection_error_handler(exception)
    logger.error exception
    exception.backtrace.each { |line| logger.error line }
    handle_error 'daemon_unavailable', :bad_gateway
  end

  def daemon_timeout_error_handler(exception)
    handle_error 'daemon_timeout', :gateway_timeout
  end

  def check_cluster_authentication
    @username = authentications[params[:ip]]
    unless @username
      handle_error 'not_authenticated', :unauthorized and return
    end
  end

  def authentications
    session[:authentications] ||= {}
  end

  def auth_response
    daemon.authenticate?(params[:username], params[:password])
  end

  def daemon
    DaemonClient::Connection.new(connection_opts)
  end

  def daemon_sessions_wrapper
    opts = {
      :handler => 'Alces::AccessManagerDaemon::SessionsHandler',
      :username => @username
    }
    DaemonClient::Wrapper.new(daemon, opts)
  end

  def connection_opts
    cluster_daemon_address = "#{params[:ip]}:#{cluster_config[:auth_port]}"
    @connection_opts ||= {
      address: cluster_daemon_address,
      timeout: overall_config[:timeout],
      ssl_config: cluster_config[:ssl] ? ssl_config : nil
    }
  end

  def ssl_config
    # Adapted from similar code in ASM `config/initializers/config.rb`.
    Class.new do
      include Alces::Tools::SSLConfigurator

      def initialize(overall_config)
        # Make the outer controller's SSL config available within this class.
        @ssl_config = overall_config[:ssl]
      end

      def ssl_verify_mode
        if @ssl_config[:verify] == false
          OpenSSL::SSL::VERIFY_NONE
        else
          OpenSSL::SSL::VERIFY_PEER | OpenSSL::SSL::VERIFY_FAIL_IF_NO_PEER_CERT
        end
      end

      def ssl
        Alces::Tools::SSLConfigurator::Configuration
          .new(@ssl_config.slice(:root, :certificate, :key, :ca))
      end
    end.new(overall_config).ssl_config
  end

  def sessions_info
    daemon_sessions_wrapper.sessions_info(@username)
  end

  def launch_session_for_user(type, request_compute_node)
    daemon_sessions_wrapper.launch_session(type, request_compute_node)
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

  def write_config(new_config)
    File.write(config_file, YAML.dump(new_config))
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
