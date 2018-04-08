class Genre < ApplicationRecord
  has_many :books
  validates :name, presence: true
  before_validation :make_title_case
  scope :alphabatize, -> { order('name asc') }

  def make_title_case
    self.name = self.name.titlecase
  end

end
