class Api::RegistrationsController < Devise::RegistrationsController
  skip_before_action :verify_authenticity_token
  clear_respond_to
  respond_to :json

  private

  def sign_up_params
    params.require(:user).permit(
      :first_name, :last_name, :role,
      :email, :verify_email, :password, :password_confirmation, :assigned_companies, :company_id
    )
  end

  def account_update_params
    params.require(:user).permit(
      :first_name, :last_name, :role,
      :email, :verify_email, :password, :password_confirmation,
      :current_password, :assigned_companies, :company_id
    )
  end

  def update_resource(resource, params)
    resource.update_without_password(params)
  end

end
