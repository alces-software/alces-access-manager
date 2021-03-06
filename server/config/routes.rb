Rails.application.routes.draw do

  # Load the Access Manager web app.
  root to: 'home#index'

  # Access Manager api.
  namespace :api, defaults: { format: 'json' } do
    namespace :v1 do

      resources :clusters, only: [:index] do
        collection do
          post :register
        end
      end

      resources :sessions, only: [] do
        member do
          post :screenshot
        end
      end

      cluster_route_params = {
        constraints: {ip: /[^\/]+/} # Allow IP to have any chars except '/'.
      }

      post 'cluster/:ip/authenticate',
        to: 'clusters#authenticate',
        **cluster_route_params

      get 'cluster/:ip/ping',
        to: 'clusters#ping',
        **cluster_route_params

      get 'cluster/:ip/sessions',
        to: 'clusters#sessions',
        **cluster_route_params

      launch_session_route_params = cluster_route_params.tap do |params|
        params[:constraints] = params[:constraints].merge({
          node_type: /login|compute/ # node_type can only be one of these values.
        })
      end
      post 'cluster/:ip/launch/:session_type/on/:node_type',
        to: 'clusters#launch_session',
        **launch_session_route_params

      get 'cluster/:ip/vpn-config',
        to: 'clusters#vpn_config',
        **cluster_route_params

      post 'cluster/:ip/logout',
        to: 'clusters#logout',
        **cluster_route_params
    end
  end

  # We have the Rails app serve up assets, including the session screenshots
  # sent to us by the cluster. If a screenshot exists then requests for it will
  # be handled by Rails before ever reaching the router; however if a
  # screenshot does not yet exist we need to explicitly catch this here and
  # return a 404, otherwise the below route will be matched and a 500 will be
  # given.
  scope format: true, constraints: {format: 'png'} do
    get '*path' => 'home#unavailable_screenshot'
  end

  # For all other GET requests render the index page to load the Access Manager
  # app; this will then show the requested page.
  get '*path' => 'home#index'
end
