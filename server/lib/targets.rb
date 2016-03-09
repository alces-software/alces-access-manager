
require 'digest/md5'
require 'alces/tools/ssl_configurator'
# require 'arriba'
# require 'arriba/target/posix'
# require 'arriba/target/s3'

module Alces
  class Targets < Struct.new(:username)
    delegate :targets, :secret, :to => self

    def each(&block)
      all.each(&block)
    end

    def all
      @errors = []
      targets(username).keys.map { |name| get(name) }.compact
    end

    def errors
      @errors
    end

    def get(name)
      begin
      data = targets(username)[name].merge(
        :name => name,
        :username => username
      )
        Arriba::Target.new(data)
      rescue => e
        STDERR.puts("WARNING: error in target #{name} for user #{username}, ignoring definition (#{e})")
        @errors.push([name, data[:file] || "unknown", e])
        nil
      end
    end

    def valid?
      # ASM has already checked the authorization of this request. So as long
      # as we have a username, we are good to go.
      !!username
    end

    private

    class << self
      def targets(username)
        @targets =
          begin
            d = data(username).stringify_keys
            d.merge(d) do |k,meta|
              if (ssl_key = meta.delete(:ssl)) != false
                meta[:ssl] = ssl_for(ssl_key) 
              end
              meta
            end
          end
      end

      def ssl_for(ssl_key)
        if ssl_key != false
            @my_ssl ||= Class.new do
              include Alces::Tools::SSLConfigurator
              def ssl
                ssl_opts = AlcesStorageManager::config[:ssl].dup
                Alces::Tools::SSLConfigurator::Configuration.new(
                  root: ssl_opts[:root],
                  certificate: ssl_opts[:certificate],
                  key: ssl_opts[:key],
                  ca: ssl_opts[:ca]
                )
              end
            end.new
        else
          nil
        end
      end

      def data(username)
        opts = {
          :handler => 'Alces::StorageManagerDaemon::TargetsHandler',
          :username => username
        }
        wrapper = DaemonClient::Wrapper.new(AlcesStorageManager::authentication_daemon, opts)
        wrapper.targets_for(username)
      end
    end
  end
end
