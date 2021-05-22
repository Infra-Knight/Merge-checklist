class Feature < ApplicationRecord
  has_many :check_items, dependent: :destroy

  validates :name, presence: true, length: { minimum: 3 }
  validates :status, presence: true, inclusion: {in: VALID_STATUSES}
  validates :release_date, presence: true
  validates :description, presence: true

  VALID_STATUSES = ['To Do', 'In Progress', 'In Review', 'Merged']

end
