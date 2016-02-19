require 'yaml'

require 'test_helper'

class Api::V1::ClustersControllerTest < ActionController::TestCase
  setup do
    @controller.stubs(:auth_response).raises(
      RuntimeError,
      "You should override `auth_response` to give the response you expect,
        rather than attempting requests to actual Daemon.")
  end

  test "should return the clusters specified in the config file" do
    # TODO: change this, will currently return whole config (is that what we want?)
    sample_config_file_path = File.join(File.dirname(File.expand_path(__FILE__)), 'sample_config.yaml')
    @controller.stubs(:config_file).returns(sample_config_file_path)

    get :index
    assert_response :success

    config = YAML.load_file(sample_config_file_path)
    json_response = JSON.parse(@response.body)
    assert_equal json_response, config
  end

  test "authenticates valid user" do
    @controller.stubs(:auth_response).returns(true)

    post :authenticate,
      ip: test_daemon_ip,
      username: 'real_user',
      password: 'hunter2'

    # Returns success code, success Json, and sets username in session.
    assert_response :success
    assert json_response[:success]
    assert_equal 'real_user', session[:authenticated_username]
  end

  test "uses cluster config from file when authenticating" do
    sample_config_file_path = File.join(File.dirname(File.expand_path(__FILE__)), 'sample_config.yaml')
    @controller.stubs(:config_file).returns(sample_config_file_path)

    @controller.stubs(:auth_response).returns(true)

    post :authenticate,
      ip: test_daemon_ip,
      username: 'real_user',
      password: 'hunter2'

    # Not ideal to test private method but want to make sure using correct
    # options for Daemon connection; may be better way to do this.
    connection_opts = @controller.send(:connection_opts)

    assert connection_opts.respond_to? :[]
    assert_equal '127.0.0.1:25269', connection_opts[:address]
    assert_equal false, connection_opts[:ssl]
    assert_equal 5, connection_opts[:timeout]
  end

  test "does not authenticate invalid user" do
    @controller.stubs(:auth_response).returns(false)

    post :authenticate,
      ip: test_daemon_ip,
      username: 'invalid_user',
      password: 'password'

    assert_response :unauthorized
    assert_not json_response[:success]
    assert_equal 'invalid_credentials', json_response[:error]
  end

  test "returns error when Daemon not available" do
    @controller.stubs(:auth_response).raises(DaemonClient::ConnError)

    # Would be valid credentials, but invalid port for Daemon.
    post :authenticate,
      ip: test_daemon_ip,
      username: 'real_user',
      password: 'hunter2'

    assert_response :forbidden # TODO: Appropriate status code?
    assert_not json_response[:success]
    assert_equal 'daemon_unavailable', json_response[:error]
  end

  test "clears session when logout" do
    @controller.stubs(:auth_response).returns(true)

    post :authenticate,
      ip: test_daemon_ip,
      username: 'real_user',
      password: 'hunter2'
    assert_equal 'real_user', session[:authenticated_username]

    post :logout
    assert_response :success
    assert_equal nil, session[:authenticated_username]
  end

  private

  def test_daemon_ip
    '127.0.0.1'
  end

  def json_response
    decoded_json = ActiveSupport::JSON.decode @response.body
    decoded_json.with_indifferent_access
  end
end
