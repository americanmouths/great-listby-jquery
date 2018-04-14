Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'welcome#home'
  get '/users/:id/reviews', to: 'users#reviews', as: 'users_reviews'
  get '/users/:id/highest_rated_books', to: 'users#highest_rated_books', as: 'users_highest_rated_books'
  get '/users/:id/lowest_rated_books', to: 'users#lowest_rated_books', as: 'users_lowest_rated_books'

  resources :books do
    resources :reviews, only: [:create, :destroy, :new, :edit, :update]
  end

  resources :book_lists do
    resources :books, only: [:create, :destroy, :new, :edit, :update]
  end

  resources :authors, only: [:index, :show]
  resources :genres, only: [:index, :show]
end
