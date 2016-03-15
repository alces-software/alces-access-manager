
require 'test_helper'

class RoutesTest < ActionController::TestCase
  test 'base route should route to home to load web app' do
    assert_routing '/', {controller: 'home', action: 'index'}
  end

  test 'all unmatched routes should route to home to load web app' do
    path = 'no/route/exists'
    assert_routing '/' + path, {controller: 'home', action: 'index', path: path}
  end

  test "should route to clusters index" do
    assert_clusters_route '/api/v1/clusters', action: 'index'
  end

  test "should route to cluster authenticate" do
    assert_single_cluster_route 'authenticate', 'post'
  end

  test "should route to cluster sessions" do
    assert_single_cluster_route 'sessions'
  end

  test "should route to ping cluster" do
    assert_single_cluster_route 'ping'
  end

  test "should route to cluster logout" do
    assert_single_cluster_route 'logout', 'post'
  end

  test "should route to register a cluster" do
    assert_clusters_route({method: 'post', path: '/api/v1/clusters/register'}, {action: 'register'})
  end

  private

  def assert_single_cluster_route(route_suffix, method='get')
    assert_clusters_route({
      method: method,
      path: "/api/v1/cluster/127.0.0.1/#{route_suffix}"
    },
    {
      action: route_suffix,
      ip: '127.0.0.1'
    })
  end

  def assert_clusters_route(route, **assert_params)
    assert_routing route, {controller: 'api/v1/clusters', format: 'json'}.merge(assert_params)
  end
end
