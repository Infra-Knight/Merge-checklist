Rails.application.routes.draw do
  root 'features#index'

  get '/features', to: 'features#index'
  get '/features/new', to: 'features#new', as: 'new_feature'
  get '/features/:id/edit', to: 'features#edit', as: 'edit_feature'
  get '/features/:id', to: 'features#show', as: 'feature'
  post '/features', to: 'features#create'
  patch '/features/:id', to: 'features#update'
  delete '/features/:id', to: 'features#destroy'
 
  get '/features/:feature_id/checkitems', to: 'checkitems#index'
  get '/features/:feature_id/checkitems/new', to: 'checkitems#new', as: 'new_checkitem'
  get '/features/:feature_id/checkitems/:id/edit', to: 'checkitems#edit', as: 'edit_checkitem'
  get '/features/:feature_id/checkitems/:id', to: 'checkitems#show', as: 'checkitem'
  post '/features/:feature_id/checkitems', to: 'checkitems#create', as: 'feature_checkitems'
  patch '/features/:feature_id/checkitems/:id', to: 'checkitems#update'
  delete '/features/:feature_id/checkitems/:id', to: 'checkitems#destroy', as: 'delete_checkitem'

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
