
require 'test_helper'

class SessionTest < ActiveSupport::TestCase

  setup do
    attrs = {
      uuid: 'some-uuid-here'
    }
    @session = Session.new(**attrs)
  end

  test "#screenshot generates new filename if none already" do
    assert_match(/some-uuid-here-[0-9]+.png/, @session.screenshot)
  end

  test "#screenshot saves generated screenshot filename" do
    screenshot = @session.screenshot
    assert_equal screenshot, @session.screenshot
  end


  # describe "#find_screenshot!" do
  #   session = Session.
  # end
end
