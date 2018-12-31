class Picture < ApplicationRecord
  validates :theme, presence: true, length: { maximum: 20}
  validates :name, presence: true, length: { maximum: 12}
  validates :canvas_url, presence: true
  validates :random_token, presence: true, uniqueness: true
end
