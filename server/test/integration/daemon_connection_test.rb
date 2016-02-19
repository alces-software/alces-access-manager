require 'test_helper'

class DaemonConnectionTest < ActionDispatch::IntegrationTest

  # Smoke test to ensure we can communicate with real daemon.
  test "authenticating valid user with real daemon" do
    post '/api/v1/cluster/127.0.0.1/authenticate',
      username: 'vagrant',
      password: 'vagrant'

    # Returns success code, success Json, and sets username in session.
    assert_response :success, "Is the daemon running at the correct address?"
    assert json_response[:success]
    assert_equal 'vagrant', session[:authenticated_username]
  end
end
