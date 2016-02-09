#!/bin/bash
#=============================================================================
# Copyright (C) 2015 Stephen F. Norledge and Alces Software Ltd.
#
# This file is part of Alces Flight.
#
# All rights reserved, see LICENSE.txt.
#=============================================================================

set -e

mkdir certs
cd certs

echo -e "\n >>> Generating server key"
echo "     Enter any passphrase, we'll remove it soon to make our life a bit easier"
echo
openssl genrsa -des3 -out server.key 1024

echo -e "\n >>> Removing passphrase from key"
echo
openssl rsa -in server.key -out newkey.key
mv newkey.key server.key

echo -e "\n >>> Generating certificate signing request"
echo "     Accept the defaults for everything if you wish."
echo
openssl req -new -key server.key -out server.csr

echo -e "\n >>> Generating certificate"
echo
openssl x509 -req -days 1024 -in server.csr -signkey server.key -out server.crt

echo -e "\n >>> Generating pem file"
echo
cat server.crt server.key > server.pem

echo -e "\n >>> All done"
echo "     The compiled assets can now be served with './scripts/simple-cors-server.py <port>'"
echo
