require 'test_helper'

class DaemonConnectionTest < ActionDispatch::IntegrationTest

  # Smoke test to ensure we can communicate with real daemon.
  test "authenticating valid user with real daemon" do
    open_session do |sess|
      sess.post '/api/v1/cluster/127.0.0.1/authenticate',
        username: 'vagrant',
        password: 'vagrant'

      # Returns success code, success Json, and sets username in session.
      sess.assert_response :success, "Is the daemon running at the correct address?"
      sess.assert sess.json_response[:success]
      sess.assert_equal 'vagrant', sess.session[:authenticated_username]

      # Check can now successfully get sessions for user on cluster.
      sess.get '/api/v1/cluster/127.0.0.1/sessions'
      sess.assert_response :success
      # TODO: Don't currently assert anything about response as can vary -
      # maybe should?
    end
  end

end
