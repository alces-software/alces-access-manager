
workers 1
# Default timeout is 60s
worker_timeout 60
# Minimum and maximum number of threads set to be the same.
threads 16, 16

preload_app!

port ENV['PORT'] || '3000'
environment ENV['RACK_ENV'] || 'development'

# Additional text to display in process listing
tag 'alces-access-manager'
