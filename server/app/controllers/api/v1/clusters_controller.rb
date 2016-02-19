require 'yaml'

class Api::V1::ClustersController < ApplicationController
  def index
    render json: configuration.to_json
  end

  # TODO: From LoginController, need to test and adapt for AM

  # def index
  #   if session.has_key?(:authenticated_username)
  #     redirect_to root_url
  #   end
  # end

  def authenticate
    begin
      authentication_daemon = DaemonClient::Connection.new(connection_opts)
      auth_response = authentication_daemon.authenticate?(params[:username], params[:password])
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

  def connection_opts
    cluster_daemon_address = params[:ip] + ':25269' # TODO read port from config
    configuration.slice(:ssl, :timeout).merge(address: cluster_daemon_address)
  end

  def config_file
    Rails.configuration.x.config_file
  end

  def configuration
    @config ||= YAML.load_file(config_file)
  end

  def handle_error(message, status)
    render json: {success: false, error: message}, status: status
  end
end
