class AddFeatureIdToChecklist < ActiveRecord::Migration[6.1]
  def change
    add_column :checklists, :feature_id, :integer
    add_index :checklists, :feature_id
  end
end
