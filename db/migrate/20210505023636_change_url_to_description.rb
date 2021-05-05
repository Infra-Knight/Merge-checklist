class ChangeUrlToDescription < ActiveRecord::Migration[6.1]
  def change
    rename_column :features, :url, :description
  end
end
