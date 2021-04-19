class AddFearueIdToCheckitem < ActiveRecord::Migration[6.1]
  def change
    add_reference :checkitems, :feature, null: false, foreign_key: true
  end
end
