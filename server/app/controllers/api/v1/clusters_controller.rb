require 'yaml'

class Api::V1::ClustersController < ApplicationController
  def index
    render json: overall_config.to_json
  end

  # TODO: From LoginController, need to test and adapt for AM

  # def index
  #   if session.has_key?(:authenticated_username)
  #     redirect_to root_url
  #   end
  # end

  def authenticate
    begin
      if auth_response
        reset_session
        session[:authenticated_username] = params[:username]
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

  private

  def auth_response
    authentication_daemon = DaemonClient::Connection.new(connection_opts)
    authentication_daemon.authenticate?(params[:username], params[:password])
  end

  def connection_opts
    cluster_daemon_address = params[:ip] + ':25269' # TODO read port from config
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
    cluster_configs_matching_ip[0]
  end

  def handle_error(message, status)
    render json: {success: false, error: message}, status: status
  end
end
