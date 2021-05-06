class CheckitemsController < ApplicationController
  def create
    @feature = Feature.find(params[:feature_id])
    @checkitem = @feature.checkitems.create(checkitem_params)
    redirect_to feature_path(@feature)
  end

  private
    def checkitem_params
      params.require(:checkitem).permit(:description)
    end
end
