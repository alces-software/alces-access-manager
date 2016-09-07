
require 'base64'

class Api::V1::SessionsController < ApplicationController
  def screenshot
    delete_old_screenshots
    IO.binwrite(screenshot_filename, received_screenshot_png)
  end

  private

  def request_json
    JSON.parse(request.body.readlines.join)
  end

  def received_screenshot_png
    Base64.decode64(encoded_screenshot)
  end

  def encoded_screenshot
    # Clusterware session-screenshot handler currently makes the screenshot
    # request in JSONAPI format (for previously planned compatibility with
    # FlightDeck).
    request_json['data']['attributes']['content']
  end

  def screenshot_filename
    # We save screenshots in a file with a random suffix appended, so that
    # whenever we receive a new screenshot the filename changes and the new
    # filename is passed to the client, and the browser then knows to load the
    # new image.
    session_id = params[:id]
    random_suffix = rand(10000000)
    Rails.root.join(
      'public', 'session-screenshots', "#{session_id}-#{random_suffix}.png"
    )
  end

  def delete_old_screenshots
    screenshots = Session.screenshot_glob(params[:id])
    FileUtils.rm(screenshots)
  end
end
