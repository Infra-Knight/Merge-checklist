class Feature < ApplicationRecord
  has_many :checkitems

  validates :name, presence: true, length: { minimum: 3 }
  validates :description, presence: true
  validates :status, presence: true
  validates :release_date, presence: true
end
