class CreateFeatures < ActiveRecord::Migration[6.1]
  def change
    create_table :features do |t|
      t.string :name
      t.string :status
      t.date :release_date
      t.string :description

      t.timestamps
    end
  end
end
