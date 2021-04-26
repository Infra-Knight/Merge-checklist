Rails.application.routes.draw do
  root 'features#index'

  get '/features', to: 'features#index'
  get '/features/new', to: 'features#new', as: 'new_feature'
  get '/features/edit/:id', to: 'features#edit', as: 'edit_feature'
  get '/features/:id', to: 'features#show', as: 'feature'

  post '/features', to: 'features#create'

  patch '/features/:id', to: 'features#update'

  delete '/features/:id', to: 'features#destroy'
 
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
