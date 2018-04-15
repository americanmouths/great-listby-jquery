class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :rating, :name
  belongs_to :book
  belongs_to :user
end
