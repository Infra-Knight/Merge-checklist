class FeaturesController < ApplicationController
  def index
    @features = Feature.all
  end

  def show
    @feature = Feature.find(params[:id])
  end

  def new
    @feature = Feature.new
  end

  def create
    @feature = Feature.new(feature_params)

    if @feature.save
      redirect_to @feature
    else
      render :new
    end
  end

  def destroy
    @feature = Feature.find(params[:id])
    @feature.destroy

    redirect_to root_path
  end

  private
    def feature_params
      params.require(:feature).permit(:name, :url, :status, :release_date)
    end
end
