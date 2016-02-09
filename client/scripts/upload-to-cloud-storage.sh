#!/bin/bash
#=============================================================================
# Copyright (C) 2015 Stephen F. Norledge and Alces Software Ltd.
#
# This file is part of Alces Flight.
#
# All rights reserved, see LICENSE.txt.
#=============================================================================
set -e

main() {
    upload_everything
    upload_css
    compress_javascript
    upload_javascript
}


upload_everything() {
    gsutil -m \
        -h "Cache-Control:public,max-age=31557600" \
        cp -a public-read  \
        dist/*  gs://alces-portal/alces-flight/
}

upload_css() {
    gsutil -m \
        -h "Cache-Control:public,max-age=31557600" \
        cp -a public-read  \
        dist/*.css  gs://alces-portal/alces-flight/
}

compress_javascript() {
    for i in dist/*alces-flight.*.min.js ; do
        gzip $i
        mv $i.gz $i
    done
}

upload_javascript() {
    gsutil -m \
        -h "Cache-Control:public,max-age=31557600" \
        -h "Content-Encoding:gzip" \
        cp -a public-read  \
        dist/*alces-flight.*.min.js  gs://alces-portal/alces-flight/
}

main "$@"
