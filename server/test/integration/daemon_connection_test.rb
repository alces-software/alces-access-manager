
require 'test_helper'

class DaemonConnectionTest < ActionDispatch::IntegrationTest
  # TODO: Should we test launching sessions? Can take a while + also no way to
  # kill sessions yet, so should probably wait for this to be possible first,
  # otherwise testing will leave sessions lying around.

  # Smoke test to ensure we can communicate with real daemon.
  test "authenticating valid user with real daemon" do
    open_session do |sess|
      sess.get '/api/v1/cluster/127.0.0.1/ping'

      sess.assert_response :success, "Is the daemon running at the correct address?"
      sess.assert sess.json_response[:available]

      sess.post '/api/v1/cluster/127.0.0.1/authenticate',
        username: 'vagrant',
        password: 'vagrant'

      # Returns success code, success Json, and sets username in session.
      sess.assert_response :success, "Is the daemon running at the correct address?"
      sess.assert sess.json_response[:success]
      sess.assert_equal 'vagrant', sess.session[:authentications]['127.0.0.1']

      # Check can now successfully get sessions for user on cluster.
      sess.get '/api/v1/cluster/127.0.0.1/sessions'
      sess.assert_response :success

      # Check any returned sessions conform to desired format.
      sessions = sess.json_response[:sessions]
      sess.assert_respond_to(sessions, :each)
      sessions.each do |session|
        session = session.with_indifferent_access
        [:display, :port, :password, :host, :hostname, :access_host, :websocket, :type].each do |prop|
          sess.assert session.key?(prop), "Session has no key '#{prop}' - session: #{session.inspect}"
        end
      end
    end
  end

end
