class AuthorsSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_many :books
end
