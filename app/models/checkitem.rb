class Checkitem < ApplicationRecord
  belongs_to :feature

  validates :description, presence: true
end
