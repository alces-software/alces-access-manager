
require 'drb'
require 'timeout'
require 'active_support/core_ext/array/extract_options'
require 'daemon_client/errors'

module DRb
  class << self
    def config
      current_server.config
    rescue
      @default_config ||= DRbServer.make_config
    end
  end
end

# This is defined here to allow the server-side to throw an exception
# that is to be caught and reraised for handling by the caller.
#
# Ideally we would collaboratively define the exception class to be
# used here somewhere that both daemon_client and
# ASMD can both use -- perhaps alces-tools as
# Alces::Tools::RemoteServiceError?
module Alces
  module AccessManagerDaemon
    class HandlerError < RuntimeError; end
  end
end

module DaemonClient
  class Executor
    attr_accessor :address
    def initialize(address, options)
      self.address = address
      @ssl_config = options.key?(:ssl_config) && options.delete(:ssl_config)
      @remote = establish_connection
      @timeout = options.delete(:timeout) || 2
    end

    def establish_connection
      scheme = @ssl_config ? 'drbssl' : 'druby'
      DRb.config.merge!(@ssl_config) if @ssl_config
      DRbObject.new_with_uri("#{scheme}://#{address}")
    end

    def forked_io(*a,&b)
      remotely do |r|
        r.forked_io(*a,&b)
      end
    end

    def exec(s, *a, &b)
      options = a.extract_options!
      remotely do |r|
        r.send(s, options, *a, &b)
      end
    end

    private
    def remotely(&block)
      Timeout.timeout(@timeout) do
        block.call(@remote)
      end
    rescue Timeout::Error
      raise DaemonClient::TimeoutError, "Timeout when communicating with AAM daemon: #{$!.message}"
    rescue DRb::DRbConnError, Errno::ECONNREFUSED
      raise DaemonClient::ConnError, "Could not communicate with AAM daemon: #{$!.message}"
    rescue Alces::AccessManagerDaemon::HandlerError
      raise DaemonClient::RemoteError, "An error occurred during AAM handler execution: #{$!.message}"
    rescue
      STDERR.puts '===== UNCAUGHT DAEMON EXCEPTION DETECTED ====='
      STDERR.puts "(Logged @#{__FILE__}:#{__LINE__})"
      STDERR.puts "#{$!.class}: #{$!.message}"
      STDERR.puts $!.backtrace.join("\n")
      STDERR.puts '================================================='
      raise
    end
  end
end
