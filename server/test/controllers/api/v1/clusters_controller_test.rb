require 'yaml'

require 'test_helper'

class Api::V1::ClustersControllerTest < ActionController::TestCase
  test "should return the clusters specified in the config file" do
    sample_config_file_path = File.join(File.dirname(File.expand_path(__FILE__)), 'sample_config.yaml')
    @controller.stubs(:config_file).returns(sample_config_file_path)

    get :index
    assert_response :success

    config = YAML.load_file(sample_config_file_path)
    json_response = JSON.parse(@response.body)
    assert_equal json_response, config
  end
end
