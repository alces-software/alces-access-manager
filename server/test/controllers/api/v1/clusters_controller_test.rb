
require 'tempfile'
require 'yaml'

require 'test_helper'

class Api::V1::ClustersControllerTest < ActionController::TestCase
  # TODO: look through and reduce test duplication.
  # TODO: should be more consistent with what is mocked/handling varied configs
  # too?

  class IndexTest < Api::V1::ClustersControllerTest
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

    test "returns empty array if clusters config empty" do
      mock_config = {
        clusters: nil
      }
      @controller.stubs(:load_config).returns(mock_config)

      get :index

      expected_response = {clusters: []}.with_indifferent_access
      assert_equal expected_response, json_response
    end
  end

  class RegisterTest < Api::V1::ClustersControllerTest
    test "adds a new cluster to the config file" do
      current_config = {
        clusters: [{
          name: "First cluster",
          ip: "127.0.0.1",
          auth_port: 25269,
          ssl: false,
        }],
        environment: {
          name: "Test Environment"
        }
      }

      # Use a temporary config file for the config during this test, so only
      # need to mock the single controller method for where the config is.
      config_file = Tempfile.new('config')
      @controller.stubs(:config_file).returns(config_file.path)
      @controller.send(:write_config, current_config)

      cluster = {
        name: "New Cluster",
        ip: "10.10.10.1",
        auth_port: 25269,
        ssl: true,
      }

      post :register, {cluster: cluster}

      expected_config = current_config.tap do |config|
        config[:clusters] << cluster
      end.with_indifferent_access

      assert_response :success
      assert_equal expected_config, @controller.send(:load_config)
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
      assert_not connection_opts[:ssl]
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

      assert_error_response :bad_gateway, 'daemon_unavailable'
    end

    test "returns error if not configured to authenticate with cluster at given IP" do
      post :authenticate,
        ip: '1.2.3.4',
        username: 'steve',
        password: 'password'

      assert_error_response :not_found, 'unknown_cluster'
    end

    test "can authenticate with multiple clusters and have authentications remembered" do
      mock_two_successful_auths
      auths = two_successful_auths_data

      assert_equal Hash[
        auths[0][:ip] => auths[0][:username],
        auths[1][:ip] => auths[1][:username],
      ], session[:authentications]
    end
  end

  class LogoutTest < Api::V1::ClustersControllerTest
    test "clears requested user when logout" do
      mock_two_successful_auths
      auths = two_successful_auths_data

      post :logout, ip: auths[0][:ip]

      assert_response :success
      assert_equal Hash[
        auths[1][:ip] => auths[1][:username],
      ], session[:authentications]
    end
  end

  class SessionsTest < Api::V1::ClustersControllerTest
    test "returns error if unauthenticated" do
      get :sessions, ip: '127.0.0.1'
      assert_response :unauthorized
    end

    # test "returns error when Daemon not available" do
    #   @controller.stubs(:user_sessions).raises(DaemonClient::ConnError)

    #   mock_successful_authenticate

    #   get :sessions, ip: '127.0.0.1'

    #   assert_error_response :bad_gateway, 'daemon_unavailable'
    # end
  end

  private

  def mock_two_successful_auths
    # Stub these methods so config doesn't need to contain these clusters and
    # no auth request actually made.
    [:cluster_config, :auth_response].map do |method|
      @controller.stubs(method).returns(true)
    end


    two_successful_auths_data.map do |auth|
      post :authenticate,
        ip: auth[:ip],
        username: auth[:username],
        password: 'password'
    end
  end

  def two_successful_auths_data
    [
      {ip: '10.10.10.1', username: 'user1'},
      {ip: '10.10.10.2', username: 'user2'},
    ]
  end

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
