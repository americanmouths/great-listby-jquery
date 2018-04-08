class Ability
  include CanCan::Ability

  def initialize(user)
    if user.present?
      if user.admin?
        can :manage, :all
      else
        can :create, BookList, :user_id => user.id
        can :read, BookList, :user_id => user.id
        can :update, BookList, :user_id => user.id
        can :destroy, BookList, :user_id => user.id

        can :create, Review
        can :update, Review, :user_id => user.id
        can :destroy, Review, :user_id => user.id

        can :create, Book
        can :update, Book

        can :show_reviews_for, User, :id => user.id
        can :show_highest_rated_books_for, User, :id => user.id
        can :show_lowest_rated_books_for, User, :id => user.id
      end
    else
      can :read, :reviews
      can :read, :books
      can :read, :authors
      can :read, :genres
    end
  end
end
