
Session = KeywordStruct.new(
  :access_host,
  :display,
  :host,
  :hostname,
  :password,
  :port,
  :type,
  :uuid,
  :websocket
) do

  def screenshot
    if @screenshot
      @screenshot
    else
      @screenshot = generate_screenshot_filename
    end
  end

  private

  def generate_screenshot_filename
    random_suffix = rand(10000000)
    "#{uuid}-#{random_suffix}.png"
  end

  def find_screenshot!
    screenshot_glob = Rails.root.join(
      'public', 'session-screenshots', "#{uuid}-*.png"
    )
    glob_results = Dir.glob(screenshot_glob)

    File.basename(glob_results.first)
    # TODO more things
  end
end
