class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :rating
  belongs_to :book
  belongs_to :user
end
