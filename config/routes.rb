Rails.application.routes.draw do
  root 'features#index'

  # resources :features do
  #   resources :check_items
  # end

  namespace :api do
    namespace :v1 do
      resources :features do
        resources :check_items
      end
    end
  end

  get '*path', to: 'features#index', via: :all
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
