class CreateChecklists < ActiveRecord::Migration[6.1]
  def change
    create_table :checklists do |t|
      t.string :description
      t.boolean :completed

      t.timestamps
    end
  end
end
