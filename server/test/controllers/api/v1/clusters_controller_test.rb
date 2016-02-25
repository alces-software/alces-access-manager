require 'yaml'

require 'test_helper'

class Api::V1::ClustersControllerTest < ActionController::TestCase

  class IndexTest < Api::V1::ClustersControllerTest
    # TODO: change this, will currently return whole config (is that what we want?)
    test "should return the clusters specified in the config file" do
      mock_config_file

      get :index
      assert_response :success

      config = YAML.load_file(sample_config_file_path)
      json_response = JSON.parse(@response.body)
      assert_equal json_response, config
    end

    test "includes authenticated username for each cluster" do
      mock_config = {
        clusters: [{ip: '10.10.10.1'}, {ip: '10.10.10.2'}]
      }
      @controller.stubs(:auth_response).returns(true)
      @controller.stubs(:overall_config).returns(mock_config)

      auths = [
        {ip: '10.10.10.1', username: 'user1'},
        {ip: '10.10.10.2', username: 'user2'},
      ]
      auths.map do |auth|
        post :authenticate,
          ip: auth[:ip],
          username: auth[:username],
          password: 'password'
      end

      get :index

      expected_response = mock_config.tap do |config|
        config[:clusters][0][:authenticated_username] = 'user1'
        config[:clusters][1][:authenticated_username] = 'user2'
      end.with_indifferent_access
      assert_equal expected_response, json_response
    end
  end

  class AuthenticateTest < Api::V1::ClustersControllerTest
    setup do
      @controller.stubs(:auth_response).raises(
        RuntimeError,
        "You should override `auth_response` to give the response you expect,
        rather than attempting requests to actual Daemon.")
    end

    test "requires username and password" do
      post :authenticate, ip: test_daemon_ip, username: 'brian'
      assert_response :bad_request

      post :authenticate, ip: test_daemon_ip, password: 'password'
      assert_response :bad_request
    end

    test "authenticates valid user" do
      mock_successful_authenticate

      # Returns success code, success Json, and sets username in session.
      assert_response :success
      assert json_response[:success]
      assert_equal valid_mock_user_name, session[:authentications][test_daemon_ip]
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

      assert_error_response :unauthorized, 'invalid_credentials'
    end

    test "returns error when Daemon not available" do
      @controller.stubs(:auth_response).raises(DaemonClient::ConnError)

      mock_authenticate_with_valid_login

      assert_error_response :forbidden, 'daemon_unavailable'
    end

    test "returns error if not configured to authenticate with cluster at given IP" do
      post :authenticate,
        ip: '1.2.3.4',
        username: 'steve',
        password: 'password'

      assert_error_response :not_found, 'unknown_cluster'
    end

    test "can authenticate with multiple clusters and have authentications remembered" do
      # Stub these methods so config doesn't need to contain these clusters and
      # no auth request actually made.
      [:cluster_config, :auth_response].map do |method|
        @controller.stubs(method).returns(true)
      end

      auths = [
        {ip: '10.10.10.1', username: 'user1'},
        {ip: '10.10.10.2', username: 'user2'},
      ]

      auths.map do |auth|
        post :authenticate,
          ip: auth[:ip],
          username: auth[:username],
          password: 'password'
      end

      assert_equal Hash[
        auths[0][:ip] => auths[0][:username],
        auths[1][:ip] => auths[1][:username],
      ], session[:authentications]
    end
  end

  class LogoutTest < Api::V1::ClustersControllerTest
    test "clears session when logout" do
      mock_successful_authenticate

      post :logout
      assert_response :success
      assert_empty session
    end
  end

  class SessionsTest < Api::V1::ClustersControllerTest
    test "returns error if unauthenticated" do
      get :sessions, ip: '127.0.0.1'
      assert_response :unauthorized
    end
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

  def assert_error_response(status, message)
    assert_response status
    assert_not json_response[:success]
    assert_equal message, json_response[:error]
  end
end
