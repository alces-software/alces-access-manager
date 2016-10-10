
module DaemonClient
  class ConnError < RuntimeError; end
  class RemoteError < RuntimeError; end
  class TimeoutError < RuntimeError; end
end
