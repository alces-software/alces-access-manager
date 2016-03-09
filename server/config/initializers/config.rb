
require 'daemon_client'

module AlcesAccessManager
  class << self
    def config
      @config ||= YAML.load_file(Rails.root.join("config", "storagemanager.yml"))
    end

    def authentication_daemon
      DaemonClient::Connection.new(connection_opts)
    end

    private
    
    def connection_opts
      auth_config = AlcesAccessManager::config[:auth].dup
      do_ssl = auth_config.delete(:ssl) != false
      {
        timeout: 5,
        ssl_config: do_ssl ? ssl_config : nil
      }.merge(auth_config)
    end
  
    def ssl_config
      @my_ssl ||= Class.new do
        include Alces::Tools::SSLConfigurator
        def ssl_verify_mode
          if AlcesAccessManager.config[:ssl][:verify] == false
            OpenSSL::SSL::VERIFY_NONE
          else
            OpenSSL::SSL::VERIFY_PEER | OpenSSL::SSL::VERIFY_FAIL_IF_NO_PEER_CERT
          end
        end
        def ssl
          ssl_opts = AlcesAccessManager::config[:ssl].dup
          Alces::Tools::SSLConfigurator::Configuration.new(
            root: ssl_opts[:root],
            certificate: ssl_opts[:certificate],
            key: ssl_opts[:key],
            ca: ssl_opts[:ca]
          )
        end
      end.new().ssl_config
    end
    
  end
end

# Assert at startup that the config file exists, and bug out with a large stack
# trace if not.
AlcesAccessManager.config
