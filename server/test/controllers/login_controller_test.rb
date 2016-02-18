
class LoginControllerTest < ActionController::TestCase
  test "authenticates valid user" do
    post :authenticate,
      username: 'vagrant',
      password: 'vagrant',
      address: '127.0.0.1:25269'

    # Returns success code, success Json, and sets username in session.
    assert_response :success
    assert json_response[:success]
    assert_equal 'vagrant', session[:authenticated_username]
  end

  private

  def json_response
    decoded_json = ActiveSupport::JSON.decode @response.body
    decoded_json.with_indifferent_access
  end
end
