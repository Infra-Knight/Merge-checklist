class FeatureSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :status, :release_date, :description

  has_many :check_items
end
