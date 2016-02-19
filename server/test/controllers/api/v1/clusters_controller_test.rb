require 'yaml'

require 'test_helper'

class Api::V1::ClustersControllerTest < ActionController::TestCase
  setup do
    @controller.stubs(:auth_response).raises(
      RuntimeError,
      "You should override `auth_response` to give the response you expect,
        rather than attempting requests to actual Daemon.")
  end

  # TODO: change this, will currently return whole config (is that what we want?)
  test "should return the clusters specified in the config file" do
    mock_config_file

    get :index
    assert_response :success

    config = YAML.load_file(sample_config_file_path)
    json_response = JSON.parse(@response.body)
    assert_equal json_response, config
  end

  test "authenticates valid user" do
    mock_successful_authenticate

    # Returns success code, success Json, and sets username in session.
    assert_response :success
    assert json_response[:success]
    assert_equal valid_mock_user_name, session[:authenticated_username]
  end

  test "uses cluster config from file when authenticating" do
    mock_config_file
    mock_successful_authenticate

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

    mock_authenticate_with_valid_login

    assert_response :forbidden # TODO: Appropriate status code?
    assert_not json_response[:success]
    assert_equal 'daemon_unavailable', json_response[:error]
  end

  test "clears session when logout" do
    mock_successful_authenticate

    post :logout
    assert_response :success
    assert_equal nil, session[:authenticated_username]
  end

  private

  def mock_config_file
    @controller.stubs(:config_file).returns(sample_config_file_path)
  end

  def sample_config_file_path
    File.join(File.dirname(File.expand_path(__FILE__)), 'sample_config.yaml')
  end

  def mock_successful_authenticate
    @controller.stubs(:auth_response).returns(true)
    mock_authenticate_with_valid_login
  end

  def mock_authenticate_with_valid_login
    post :authenticate,
      ip: test_daemon_ip,
      username: valid_mock_user_name,
      password: 'hunter2'
  end

  def valid_mock_user_name
    'real_user'
  end

  def test_daemon_ip
    '127.0.0.1'
  end
end
