class BookListsController < ApplicationController
  before_action :set_current_user

  def index
    authorize! :read, BookList
    @booklists = current_user.book_lists
  end

  def new
    authorize! :create, BookList
    @booklist = BookList.new
  end

  def create
    @booklist = BookList.create(book_list_params)
    authorize! :create, BookList
    if @booklist.save
      update_book_statuses
      redirect_to book_list_path(@booklist)
    else
      render :new
    end
  end

  def show
    @booklist = BookList.find_by(id: params[:id])
    authorize! :read, @booklist
  end

  def edit
    @booklist = BookList.find_by(id: params[:id])
  end

  def update
    @booklist = BookList.find_by(id: params[:id])
    authorize! :update, @booklist
    @booklist.update(book_list_params)
    update_book_statuses
    redirect_to book_list_path(@booklist)
  end

  def destroy
    @booklist = BookList.find_by(id: params[:id])
    authorize! :destroy, @booklist
    @booklist.destroy
    redirect_to book_lists_path
  end

  private
   def book_list_params
     params.require(:book_list).permit(:title, :user_id, :book_ids => [], :books_attributes => [:title, :genre, :author], :book_features => [])
   end

   def set_current_user
     @user = current_user
   end

   def update_book_statuses
    if params[:book_list][:book_ids].present?
        params[:book_list][:book_ids].each do |book|
          new_book = Book.find_by(id: book)
          new_book.update_status(params[:book_list][:book_features], book_list_id: @booklist.id)
        end
      end
    if params[:book_list][:books_attributes].present? && !params[:book_list][:books_attributes]["0"][:title].empty?
      book = Book.find_by(title: params[:book_list][:books_attributes]["0"][:title].titleize)
      book.update_status(params[:book_list][:book_features], book_list_id: @booklist.id)
    end
  end

end
