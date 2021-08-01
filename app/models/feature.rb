class Feature < ApplicationRecord
  has_many :check_items, dependent: :destroy

  validates :name, presence: true, length: { minimum: 3 }
  validates :status, presence: true, inclusion: ['To Do', 'In Progress', 'In Review', 'Merged']
  validates :release_date, presence: true
  validates :description, presence: true

end
