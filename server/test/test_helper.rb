ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../../config/environment', __FILE__)
require 'rails/test_help'
require 'mocha/mini_test'

require "minitest/reporters"
Minitest::Reporters.use!


class ActiveSupport::TestCase
  # Add helper methods to be used by all tests here.

  def json_response
    decoded_json = ActiveSupport::JSON.decode @response.body
    decoded_json.with_indifferent_access
  end
end
