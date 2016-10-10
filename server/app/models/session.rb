
# At some point it might be nice/useful to have a proper Session abstraction
# which we can create instances of. Until that time, this is just a useful
# dumping ground for session-related stuff that would be duplicated otherwise.
class Session
  def self.screenshot_glob(session_id)
      screenshot_glob = Rails.root.join(
        'public', 'session-screenshots', "#{session_id}-*.png"
      )
      Dir.glob(screenshot_glob)
  end

  def self.screenshot_filename_for_session(session_id)
    screenshots = screenshot_glob(session_id)
    screenshots.first && File.basename(screenshots.first)
  end
end
