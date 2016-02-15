
require 'ostruct'

# TODO: This file is adapted from the equivalent in Alces Flight, further work
# will be needed for a production build.

class HomeController < ActionController::Base
  def index
    @assets = OpenStruct.new(
      js_bundle_url: 'http://localhost:3001/alces-access-manager.js',
      css_bundle_url: 'http://localhost:3001/alces-access-manager.css',
      revision: 'dev_build'
    )
  end

  helper_method :body_element_attrs
  def body_element_attrs
    # Intentionally nil for the moment.
  end
end
