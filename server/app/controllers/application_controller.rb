class ApplicationController < ActionController::API
  rescue_from ActionController::ParameterMissing do
    head :bad_request
  end
end
