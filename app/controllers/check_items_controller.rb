class CheckItemsController < ApplicationController
  def create
    @feature = Feature.find(params[:feature_id])
    @check_item = @feature.check_items.create(check_item_params)
    redirect_to feature_path(@feature)
  end

  def destroy
    @feature = Feature.find(params[:feature_id])
    @check_item = @feature.check_items.find(params[:id])
    @check_item.destroy
    redirect_to feature_path(@feature)
  end

  private
    def check_item_params
      params.require(:check_item).permit(:description, :finished)
    end
end
