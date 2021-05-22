class CreateCheckItems < ActiveRecord::Migration[6.1]
  def change
    create_table :check_items do |t|
      t.string :description
      t.boolean :finished
      t.references :feature, null: false, foreign_key: true

      t.timestamps
    end
  end
end
