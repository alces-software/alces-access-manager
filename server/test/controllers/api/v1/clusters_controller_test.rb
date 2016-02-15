require 'test_helper'
require 'yaml'

class Api::V1::ClustersControllerTest < ActionController::TestCase
  test "should return the clusters specified in the config file" do
    get :index
    assert_response :success

    sample_config_file = File.join(File.dirname(File.expand_path(__FILE__)), 'sample_config.yaml')
    config = YAML.load_file(sample_config_file)
    json_response = JSON.parse(@response.body)
    assert json_response == config
  end
end
