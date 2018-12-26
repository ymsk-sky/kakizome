class PicturesController < ApplicationController

  def show
    @picture = Picture.find(params[:id])
  end

  def new
    @picture = Picture.new
  end

  def product
  end

  def gallery
  end
end
