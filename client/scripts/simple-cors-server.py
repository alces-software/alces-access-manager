#! /usr/bin/env python2

import sys
from SimpleHTTPServer import SimpleHTTPRequestHandler
import BaseHTTPServer
import ssl

class CORSRequestHandler (SimpleHTTPRequestHandler):
    def end_headers (self):
        self.send_header('Access-Control-Allow-Origin', '*')
        SimpleHTTPRequestHandler.end_headers(self)

def run_ssl_server():
    if sys.argv[1:]:
        port = int(sys.argv[1])
    else:
        port = 3002
    server_address = ('', port)

    httpd = BaseHTTPServer.HTTPServer(server_address, CORSRequestHandler)

    httpd.socket = ssl.wrap_socket (httpd.socket, certfile='../certs/server.pem', server_side=True)
    sa = httpd.socket.getsockname()
    print "Serving HTTPs on", sa[0], "port", sa[1], "..."
    httpd.serve_forever()


if __name__ == '__main__':
    run_ssl_server()
