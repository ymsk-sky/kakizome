require 'test_helper'

class PicturesControllerTest < ActionDispatch::IntegrationTest

  test "should get product" do
    get product_path
    assert_response :success
  end

  test "should get gallery" do
    get gallery_path
    assert_response :success
  end
end
