class BookList < ApplicationRecord
  belongs_to :user
  has_many :book_features
  has_many :books, :through => :book_features
  validates :title, :presence => true

  def books_attributes=(book_attributes)
    book_attributes.values.each do |book_attribute|
    if book_attribute[:title].present?
        genre = Genre.find_or_create_by(name: book_attribute[:genre])
        author = Author.find_or_create_by(name: book_attribute[:author])
        book = Book.find_or_create_by(title: book_attribute[:title], genre: genre, author: author)
          if !self.books.include?(book)
            self.books << book
          end
        end
      end
    end

  def book_ids=(ids)
    ids.each do |id|
      book = Book.find_by(id: id)
      if !self.books.include?(book)
        self.books << book
      end
    end
  end
end
