class CreateFeatures < ActiveRecord::Migration[6.1]
  def change
    create_table :features do |t|
      t.string :id
      t.string :name
      t.string :status
      t.date :release_date

      t.timestamps
    end
  end
end
