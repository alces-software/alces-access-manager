Rails.application.routes.draw do

  # Load the Access Manager web app.
  root to: 'home#index'

  # Access Manager api.
  namespace :api, defaults: { format: 'json' } do
    namespace :v1 do

      resources :clusters, only: [:index]

      post 'cluster/:ip/authenticate',
        to: 'clusters#authenticate',
        constraints: {ip: /[^\/]+/} # Allow IP to have any chars except '/'.

      get 'cluster/:ip/sessions',
        to: 'clusters#sessions',
        constraints: {ip: /[^\/]+/} # Allow IP to have any chars except '/'.

      post 'cluster/:ip/logout',
        to: 'clusters#logout',
        constraints: {ip: /[^\/]+/} # Allow IP to have any chars except '/'.
    end
  end

  # For all other GET requests render the index page to load the Access Manager
  # app; this will then show the requested page.
  get '*path' => 'home#index'
end
