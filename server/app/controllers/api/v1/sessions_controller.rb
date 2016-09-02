
require 'base64'

class Api::V1::SessionsController < ApplicationController
  def screenshot
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
    session_id = params[:id]
    "public/session-screenshots/#{session_id}.png"
  end
end
