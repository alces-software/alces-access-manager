
class LoginControllerTest < ActionController::TestCase
  # TODO: At some point should probably decouple tests from actual daemon so
  # don't have to wait for daemon to respond in tests, and so can also test
  # controller independently of real daemon client .

  test "authenticates valid user" do
    post :authenticate,
      username: 'vagrant',
      password: 'vagrant',
      address: test_daemon_address

    # Returns success code, success Json, and sets username in session.
    assert_response :success
    assert json_response[:success]
    assert_equal 'vagrant', session[:authenticated_username]
  end

  test "does not authenticate invalid user" do
    post :authenticate,
      username: 'steve',
      password: 'password',
      address: test_daemon_address

    assert_response :unauthorized
    assert_not json_response[:success]
    assert_equal 'invalid_credentials', json_response[:error]
  end

  test "returns error when Daemon not available" do
    # Would be valid credentials, but invalid port for Daemon.
    post :authenticate,
      username: 'vagrant',
      password: 'vagrant',
      address: '127.0.0.1:6666'

    assert_response :forbidden # TODO: Appropriate status code?
    assert_not json_response[:success]
    assert_equal 'daemon_unavailable', json_response[:error]
  end

  private

  def test_daemon_address
    # TODO: Don't hardcode this?
    '127.0.0.1:25269'
  end

  def json_response
    decoded_json = ActiveSupport::JSON.decode @response.body
    decoded_json.with_indifferent_access
  end
end
