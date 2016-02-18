require 'yaml'

require 'test_helper'

class Api::V1::ClustersControllerTest < ActionController::TestCase
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

  # TODO: At some point should probably decouple tests from actual daemon so
  # don't have to wait for daemon to respond in tests, and so can also test
  # controller independently of real daemon client.

  test "authenticates valid user" do
    post :authenticate,
      ip: test_daemon_ip,
      username: 'vagrant',
      password: 'vagrant'

    # Returns success code, success Json, and sets username in session.
    assert_response :success
    assert json_response[:success]
    assert_equal 'vagrant', session[:authenticated_username]
  end

  # TODO: This test in particular often fails when nothing wrong, due to not
  # being able to communicate with Daemon so returning wrong status.
  test "does not authenticate invalid user" do
    post :authenticate,
      ip: test_daemon_ip,
      username: 'steve',
      password: 'password'

    assert_response :unauthorized
    assert_not json_response[:success]
    assert_equal 'invalid_credentials', json_response[:error]
  end

  test "returns error when Daemon not available" do
    # Would be valid credentials, but invalid port for Daemon.
    post :authenticate,
      ip: '10.10.10.10',
      username: 'vagrant',
      password: 'vagrant'

    assert_response :forbidden # TODO: Appropriate status code?
    assert_not json_response[:success]
    assert_equal 'daemon_unavailable', json_response[:error]
  end

  test "clears session when logout" do
    post :authenticate,
      ip: test_daemon_ip,
      username: 'vagrant',
      password: 'vagrant'
    assert_equal 'vagrant', session[:authenticated_username]

    post :logout
    assert_response :success
    assert_equal nil, session[:authenticated_username]
  end

  private

  def test_daemon_ip
    # TODO: Don't hardcode this?
    '127.0.0.1'
  end

  def json_response
    decoded_json = ActiveSupport::JSON.decode @response.body
    decoded_json.with_indifferent_access
  end
end
