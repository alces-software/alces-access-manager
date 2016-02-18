#==============================================================================
# Copyright (C) 2015 Stephen F. Norledge and Alces Software Ltd.
#
# This file/package is part of Alces Storage Manager.
#
# Alces Storage Manager is free software: you can redistribute it and/or
# modify it under the terms of the GNU Affero General Public License
# as published by the Free Software Foundation, either version 3 of
# the License, or (at your option) any later version.
#
# Alces Storage Manager is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
# Affero General Public License for more details.
#
# You should have received a copy of the GNU Affero General Public License
# along with this package.  If not, see <http://www.gnu.org/licenses/>.
#
# For more information on the Alces Storage Manager, please visit:
# https://github.com/alces-software/alces-storage-manager
#==============================================================================

class LoginController < ApplicationController
  def index
    if session.has_key?(:authenticated_username)
      redirect_to root_url
    end
  end

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
        render json: {success: false}, status: :unauthorized
      end
    rescue DaemonClient::ConnError
      logger.error $!
      logger.error $!.backtrace
      render json: {success: false, error: 'daemon_unavailable'}, status: :forbidden
    end
  end

  def logout
    reset_session
    flash[:notice] = "You have successfully logged out."
    redirect_to action: :index
  end

  private

  def handle_error(message)
    flash[:alert] = message
    @user = params[:username]
    render :index
  end

end
