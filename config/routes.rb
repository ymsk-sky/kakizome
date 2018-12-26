Rails.application.routes.draw do
  root 'static_pages#top'
  get '/contact', to: 'static_pages#contact'
  get '/theme', to: 'pictures#theme'
  get '/writing', to: 'pictures#writing'
  get '/product', to: 'pictures#product'
  get 'gallery', to: 'pictures#gallery'
end
