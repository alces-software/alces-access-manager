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

      post 'cluster/:ip/launch/:session_type/on/:node_type',
        to: 'clusters#launch_session',
        **cluster_route_params

      post 'cluster/:ip/logout',
        to: 'clusters#logout',
        **cluster_route_params
    end
  end

  # For all other GET requests render the index page to load the Access Manager
  # app; this will then show the requested page.
  get '*path' => 'home#index'
end
