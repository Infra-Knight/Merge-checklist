class CheckItemSerializer
  include FastJsonapi::ObjectSerializer
  attributes :description, :finished, :feature_id
end
