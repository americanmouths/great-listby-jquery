class BooksController < ApplicationController
  before_action :set_current_user

  def index
    @books = Book.alphabatize
    respond_to do |format|
      format.html {render :index}
      format.json {render json: @books}
    end
  end

  def new
    authorize! :create, Book
    @genres = Genre.all
    @book = Book.new
    @booklist = BookList.find_by(id: params[:book_list_id])
    authorize! :update, @booklist
  end

  def create
    @book = Book.create(book_params)
    @booklist = BookList.find_by(id: params[:book][:book_list_id])
    if @book.save
      update_book_statuses
      redirect_to book_list_path(@booklist)
    else
      @genres = Genre.all
      @booklist = BookList.find_by(id: params[:book][:book_list_id])
      render :new
    end
  end

  def show
    @book = Book.find_by(id: params[:id])
    @reviews = @book.reviews
    if current_user
      @book_on_booklist = @book.book_lists.where(user_id: current_user.id)
    end
    respond_to do |format|
      format.html {render :show}
      format.json {render json: @book}
    end
  end

  def edit
    @book = Book.find_by(id: params[:id])
    @booklist = BookList.find_by(id: params[:book_list_id])
    authorize! :update, @booklist
  end

  def update
    @book = Book.find_by(id: params[:id])
    @book.update(book_params)
    update_book_statuses
    if params[:book][:book_list_id].present?
      @booklist = BookList.find_by(id: params[:book][:book_list_id])
      redirect_to book_list_path(@booklist)
    else
      redirect_to book_path(@book.id)
    end
  end

  def destroy
    @book = Book.find_by(id: params[:id])
    @booklist = BookList.find_by(id: params[:book_list_id])
    @booklist.books.delete(@book.id)
    flash[:notice] = "Book was deleted from your booklist"
    redirect_to book_list_path(@booklist)
  end

  private
    def book_params
      params.require(:book).permit(:term, :book_list_id, :title, :genre_name, :author_name, :book_features => [], :book_list_ids => [], :genre_id => [])
    end

    def set_current_user
      @user = current_user
    end

    def update_book_statuses
      if params[:book][:book_list_ids].present?
        @book.update_status(params[:book][:book_features], book_list_ids: params[:book][:book_list_ids])
      end

      if params[:book][:book_list_id].present?
        @book.update_status(params[:book][:book_features], book_list_id: params[:book][:book_list_id])
      end
    end
end
