class BooksSerializer < ActiveModel::Serializer
  attributes :id, :title
  belongs_to :author
  belongs_to :genre
end
