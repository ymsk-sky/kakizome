class AddRandomTokenToPictures < ActiveRecord::Migration[5.1]
  def change
    add_column :pictures, :random_token, :string
  end
end
