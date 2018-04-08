class UsersController < ApplicationController

  def reviews
    @user = User.find_by_id(params[:id])
    authorize! :show_reviews_for, @user
    @reviews = @user.reviews
    render 'users/reviews'
  end

  def highest_rated_books
    @user = User.find_by_id(params[:id])
    authorize! :show_highest_rated_books_for, @user
    @books = Book.highest_rated_books.by_user(@user)
  end

  def lowest_rated_books
    @user = User.find_by_id(params[:id])
    authorize! :show_lowest_rated_books_for, @user
    @books = Book.lowest_rated_books.by_user(@user)
  end
end
