Rails.application.routes.draw do

  # Load the Access Manager web app.
  root to: 'home#index'

  # Access Manager api.
  namespace :api, defaults: { format: 'json' } do
    namespace :v1 do

      resources :clusters, only: [:index] do
        collection do
          post :authenticate
          post :logout
        end
      end

    end
  end

  # For all other GET requests render the index page to load the Access Manager
  # app; this will then show the requested page.
  # get '*path' => 'home#index'
end
