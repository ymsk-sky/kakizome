Rails.application.routes.draw do
  root 'static_pages#top'
  get '/contact', to: 'static_pages#contact'
  get '/theme', to: 'static_pages#theme'
  # get '/product', to: 'pictures#product'
  get '/gallery', to: 'pictures#gallery'
  get '/writing', to: 'pictures#new'
  post '/product', to: 'pictures#create'
  resources :pictures
end
