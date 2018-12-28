class PicturesController < ApplicationController

  def show
    @picture = Picture.find(params[:id])
  end

  def new
    @picture = Picture.new
    @user_theme = params[:user_theme]
    @user_name = params[:user_name]
  end

  def create
    @picture = Picture.new(picture_params)
    if @picture.save
      # redirect_to @picture
      redirect_to product_path
    else
      render 'new'
    end
  end

  def product
    # いい感じに呼び出す
    @product = Picture.last.canvas_url
  end

  def gallery
  end

  private

    def picture_params
      params.require(:picture).permit(:theme, :name, :canvas_url)
    end
end
