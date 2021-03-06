
require 'ostruct'

class HomeController < ActionController::Base
  def index
    @assets = if Rails.env.production?
      assets_hash = ENV["AAM_ASSETS_HASH"]
      unless assets_hash
        puts 'ERROR: Please export AAM_ASSETS_HASH to the hash of the current assets.'
      end
      OpenStruct.new(
        js_bundle_url: "/alces-access-manager.#{assets_hash}.min.js",
        css_bundle_url: "/alces-access-manager.#{assets_hash}.css",
        revision: "production-#{assets_hash}"
      )
    else
      OpenStruct.new(
        js_bundle_url: 'http://localhost:3001/alces-access-manager.js',
        css_bundle_url: 'http://localhost:3001/alces-access-manager.css',
        revision: 'dev_build'
      )
    end
  end

  def unavailable_screenshot
    head 404
  end

  helper_method :body_element_attrs
  def body_element_attrs
    # Intentionally nil for the moment.
  end
end
