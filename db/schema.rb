# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_04_19_103514) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "checkitems", force: :cascade do |t|
    t.string "description"
    t.boolean "checked"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "feature_id", null: false
    t.index ["feature_id"], name: "index_checkitems_on_feature_id"
  end

  create_table "features", force: :cascade do |t|
    t.string "uuid"
    t.string "name"
    t.string "status"
    t.date "release_date"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "checkitems", "features"
end
