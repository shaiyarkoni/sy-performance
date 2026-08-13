#!/usr/bin/env bash
# One-time VPS setup for syaperformance.com (Ubuntu/Debian)
# Run as root or with sudo on a fresh Hostinger VPS:
#   curl -fsSL https://raw.githubusercontent.com/shaiyarkoni/sy-performance/main/scripts/setup-vps.sh | bash
set -euo pipefail

APP_DIR="/var/www/sy-performance"
REPO="https://github.com/shaiyarkoni/sy-performance.git"
DOMAIN="syaperformance.com"

echo "==> Updating system..."
apt-get update -y
apt-get upgrade -y

echo "==> Installing Node.js 22, git, nginx..."
if ! command -v node >/dev/null 2>&1; then
  curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
  apt-get install -y nodejs
fi
apt-get install -y git nginx certbot python3-certbot-nginx

echo "==> Installing PM2..."
npm install -g pm2

echo "==> Cloning app..."
mkdir -p /var/www
if [ -d "$APP_DIR/.git" ]; then
  cd "$APP_DIR"
  git pull origin main
else
  git clone "$REPO" "$APP_DIR"
  cd "$APP_DIR"
fi

if [ ! -f "$APP_DIR/.env.local" ]; then
  echo ""
  echo "!!! Create $APP_DIR/.env.local with:"
  echo "    ADMIN_PASSWORD=your-password"
  echo "    ADMIN_SESSION_SECRET=random-string-at-least-32-chars"
  echo ""
  cat > "$APP_DIR/.env.local" <<'EOF'
ADMIN_PASSWORD=CHANGE_ME
ADMIN_SESSION_SECRET=CHANGE_ME_TO_A_LONG_RANDOM_STRING_32_CHARS_MIN
EOF
  echo "Created template .env.local — EDIT IT before going live:"
  echo "  nano $APP_DIR/.env.local"
fi

echo "==> Installing dependencies and building..."
cd "$APP_DIR"
npm ci
npm run build
chmod -R u+w data public/uploads 2>/dev/null || true

echo "==> Starting PM2..."
pm2 delete sy-performance 2>/dev/null || true
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup systemd -u root --hp /root || true

echo "==> Configuring nginx..."
cp "$APP_DIR/deploy/nginx/syaperformance.conf" /etc/nginx/sites-available/syaperformance
ln -sf /etc/nginx/sites-available/syaperformance /etc/nginx/sites-enabled/syaperformance
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx

echo "==> Firewall (optional)..."
if command -v ufw >/dev/null 2>&1; then
  ufw allow OpenSSH || true
  ufw allow "Nginx Full" || true
  ufw --force enable || true
fi

echo ""
echo "============================================"
echo " Setup almost done!"
echo " 1. Edit secrets: nano $APP_DIR/.env.local"
echo " 2. Point DNS A records @ and www to this server IP"
echo " 3. After DNS works, run SSL:"
echo "    certbot --nginx -d $DOMAIN -d www.$DOMAIN"
echo " 4. Restart app: cd $APP_DIR && pm2 restart sy-performance"
echo "============================================"
