class CreateCheckitems < ActiveRecord::Migration[6.1]
  def change
    create_table :checkitems do |t|
      t.string :description
      t.boolean :checked

      t.timestamps
    end
  end
end
