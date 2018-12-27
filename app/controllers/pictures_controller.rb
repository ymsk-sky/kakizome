class PicturesController < ApplicationController

  def show
    @picture = Picture.find(params[:id])
  end

  def new
    @picture = Picture.new
  end

  def create
    @picture = Picture.new(picture_params)
    if @picture.save
      redirect_to @picture
    else
      render 'new'
    end
  end

  def product
  end

  def gallery
  end

  private

    def picture_params
      params.require(:picture).permit(:theme, :name, :canvas_url)
    end
end
