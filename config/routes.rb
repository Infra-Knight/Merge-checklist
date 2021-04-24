Rails.application.routes.draw do
  get 'features/index'
  get 'features/new'
  get 'features/show'
  get 'features/edit'
  get 'features/_form'
  root 'features#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
