require 'yaml'

class Api::V1::ClustersController < ApplicationController
  def index
    config = YAML.load_file(config_file)
    render json: config.to_json
  end

  # TODO: From LoginController, need to test and adapt for AM

  # def index
  #   if session.has_key?(:authenticated_username)
  #     redirect_to root_url
  #   end
  # end

  def authenticate
    begin
      cluster_daemon_address = params[:address]
      connection_opts = {
        address: cluster_daemon_address,
        ssl: false,
        timeout: 5,
        ssl_config: nil
      }
      authentication_daemon = DaemonClient::Connection.new(connection_opts)
      auth_response = authentication_daemon.authenticate?(params[:username], params[:password])
      if auth_response
        reset_session
        session[:authenticated_username] = params[:username]
        render json: {success: true}
      else
        handle_error 'invalid_credentials', :unauthorized
      end
    rescue DaemonClient::ConnError
      logger.error $!
      logger.error $!.backtrace
      handle_error 'daemon_unavailable', :forbidden
    end
  end

  def logout
    reset_session
  end

  private

  def config_file
    Rails.configuration.x.config_file
  end

  def handle_error(message, status)
    render json: {success: false, error: message}, status: status
  end
end
