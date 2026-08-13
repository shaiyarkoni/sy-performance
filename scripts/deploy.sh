#!/usr/bin/env bash
# Update production after code changes (run on VPS)
set -euo pipefail
cd /var/www/sy-performance
git pull origin main
npm ci
npm run build
pm2 restart sy-performance
echo "Deploy complete — https://syaperformance.com"
