
module DaemonClient
  class Wrapper < BlankSlate
    attr_accessor :connection, :options
    def initialize(connection, options)
      self.connection = connection
      self.options = options
    end

    def method_missing(s, *a, &b)
      connection.__send__(s, *a, options, &b)
    end

    # Don't send inspect to connection via method_missing.
    #
    # It will break due to being called with an empty array of options. Even
    # if it didn't, it wouldn't return the correct inspection for this object.
    def inspect
      "#<DaemonClient::Wrapper @connection=#{@connection.inspect} @options=#{@options.inspect}>"
    end
  end
end
