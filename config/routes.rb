Rails.application.routes.draw do
  root "features#index"

  resources :features do
    resources :check_items
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
