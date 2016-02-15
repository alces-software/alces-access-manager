require 'yaml'

class Api::V1::ClustersController < ApplicationController
  def index
    config = YAML.load_file(config_file)
    render json: config.to_json
  end

  private

  def config_file
    Rails.configuration.x.config_file
  end
end
