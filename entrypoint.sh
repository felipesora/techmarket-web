#!/bin/sh

cat <<EOF > /usr/share/nginx/html/assets/env.js
window.__env = {
  API_URL: "${API_URL}"
};
EOF

exec "$@"