require 'yaml'

class Api::V1::ClustersController < ApplicationController
  def index
    config_file = File.join(File.dirname(File.expand_path(__FILE__)), '../../../../test/controllers/api/v1/sample_config.yaml')
    config = YAML.load_file(config_file)

    render json: config.to_json
  end
end
