class AddUrlToFeatures < ActiveRecord::Migration[6.1]
  def change
    add_column :features, :url, :string
  end
end
