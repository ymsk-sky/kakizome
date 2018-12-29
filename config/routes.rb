Rails.application.routes.draw do
  root 'static_pages#top'
  get '/contact', to: 'static_pages#contact'
  get '/theme', to: 'static_pages#theme'
  get '/gallery', to: 'pictures#index'
  get '/writing', to: 'pictures#new'
  get '/product', to: 'pictures#product'
  post '/product', to: 'pictures#create'
  resources :pictures
end
