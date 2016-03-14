
[At some point this README will be expanded]

# Notes on running app in production locally

- `(cd client && npm run build)`

- `(cd client && cp dist/* ../server/public)`

- `export RAILS_SERVE_STATIC_FILES=true` - because Nginx isn't running to serve the assets.

- `(cd server && bin/rake secret)`

- export above generated key with `export SECRET_KEY_BASE=<secret key>`

- `export AAM_ASSETS_HASH=<current assets hash>` - where the current assets hash is the hash in the compiled js/css filenames, e.g. for `alces-access-manager.c1d7216da8a0003f1393.min.js` this is `c1d7216da8a0003f1393`.

- `(cd server && bin/rails server -e production)`
