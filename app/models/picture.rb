class Picture < ApplicationRecord
  validates :theme, presence: true, length: { maximum: 20}
  validates :name, presence: true, length: { maximum: 20}
end
