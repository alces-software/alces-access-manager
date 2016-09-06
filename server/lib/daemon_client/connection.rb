
require 'net/ping/tcp'
require 'daemon_client/errors'

module DaemonClient
  class Connection < BlankSlate
    attr_accessor :address
    class << self
      def normalize_address(address)
        return ['127.0.0.1:25268'] if address.nil?
        address.split(',').map do |a|
          if a.split(':').length == 1
            if a.to_i.to_s == a
              # we have a port only, default to localhost
              a = "127.0.0.1:#{a}"
            else
              # we have an IP only, default to 25268
              a << ':25268'
            end
          else
            a
          end
        end
      end
    end

    # options: {
    #  :address: "ip_of_daemon:port", -- defaults to 127.0.0.1:25268
    #  :ssl_config: -- these things can be easily populated via Alces::Tools::SSLConfigurator
    #    -- the presence of the ssl_config parameter invokes an SSL connection
    #    SSLCertificate: ssl_cert,
    #    SSLPrivateKey: ssl_key,
    #    SSLCACertificateFile: ssl_ca_file
    #  :timeout: 2 (default)
    def initialize(options)
      options = options.dup
      addresses = ::DaemonClient::Connection.normalize_address(options.delete(:address))
      @address = addresses.find do |a|
        ::Net::Ping::TCP.new(*a.split(':'), options[:timeout]||2).ping
      end
      ::Kernel.raise ::DaemonClient::ConnError, "Could not communicate with any AAM daemons: #{addresses.inspect}" if @address.nil?
      @executor = ::DaemonClient::Executor.new(@address, options)
    end

    # Prevent inspect from being passed over the wire
    def inspect
      "<DaemonClient::Connection address=#{@executor.address.inspect}>"
    end

    # Allow some limited form of introspection without going via DRb and
    # risking `ArgumentError: wrong number of arguments exceptions`.
    def __class__
      ::DaemonClient::Connection
    end

    def method_missing(s, *a, &b)
      if s == :forked_io
        @executor.forked_io(*a, &b)
      else
        @executor.exec(s, *a, &b)
      end
    end
  end
end
