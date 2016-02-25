require 'yaml'

class Api::V1::ClustersController < ApplicationController
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

  # TODO: From LoginController, need to test and adapt for AM

  # def index
  #   if session.has_key?(:authenticated_username)
  #     redirect_to root_url
  #   end
  # end

  def authenticate
    params.require(:username)
    params.require(:password)
    unless cluster_config
      handle_error 'unknown_cluster', :not_found and return
    end

    begin
      if auth_response
        authentications[params[:ip]] = params[:username]
        render json: {success: true}
      else
        handle_error 'invalid_credentials', :unauthorized
      end
    rescue DaemonClient::ConnError => ex
      logger.error ex
      ex.backtrace.each { |line| logger.error line }
      handle_error 'daemon_unavailable', :forbidden
    end
  end

  def logout
    reset_session
  end

  def sessions
    # TODO: Need to store which cluster this authentication is for/ store
    # authentications for different clusters for session independently -
    # currently a user could get sessions for same username on a different
    # cluster which they've not authenticated on after authenticating on.
    username = authentications[params[:ip]]
    unless username
      handle_error 'not_authenticated', :unauthorized and return
    end

    opts = {
      :handler => 'Alces::StorageManagerDaemon::SessionsHandler',
      :username => username
    }
    wrapper = DaemonClient::Wrapper.new(daemon, opts)
    render json: wrapper.sessions_for(username)
  end

  private

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
    cluster_config.slice(:ssl, :timeout).merge(address: cluster_daemon_address)
  end

  def config_file
    Rails.configuration.x.config_file
  end

  def overall_config
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
