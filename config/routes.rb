Rails.application.routes.draw do
  root 'static_pages#top'
  get '/contact', to: 'static_pages#contact'
  get '/product', to: 'pictures#product'
  get 'gallery', to: 'pictures#gallery'
  get '/theme', to: 'pictures#new'
  resources :pictures
end
