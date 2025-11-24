#!/bin/bash

# ============================================
# EC2 Server Setup Script
# Run this script on your EC2 instance
# ============================================

set -e  # Exit on any error

echo "================================================"
echo "Starting EC2 Server Setup for POS Backend"
echo "================================================"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Step 1: Update System
echo -e "${YELLOW}Step 1: Updating system...${NC}"
sudo apt update && sudo apt upgrade -y

# Step 2: Install Node.js 18
echo -e "${YELLOW}Step 2: Installing Node.js 18...${NC}"
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Verify Node.js installation
NODE_VERSION=$(node --version)
NPM_VERSION=$(npm --version)
echo -e "${GREEN}✓ Node.js installed: ${NODE_VERSION}${NC}"
echo -e "${GREEN}✓ npm installed: ${NPM_VERSION}${NC}"

# Step 3: Install PM2
echo -e "${YELLOW}Step 3: Installing PM2...${NC}"
sudo npm install -g pm2
PM2_VERSION=$(pm2 --version)
echo -e "${GREEN}✓ PM2 installed: ${PM2_VERSION}${NC}"

# Step 4: Install Git
echo -e "${YELLOW}Step 4: Installing Git...${NC}"
sudo apt install -y git
GIT_VERSION=$(git --version)
echo -e "${GREEN}✓ Git installed: ${GIT_VERSION}${NC}"

# Step 5: Install PostgreSQL Client
echo -e "${YELLOW}Step 5: Installing PostgreSQL client...${NC}"
sudo apt install -y postgresql-client
PSQL_VERSION=$(psql --version)
echo -e "${GREEN}✓ PostgreSQL client installed: ${PSQL_VERSION}${NC}"

# Step 6: Install Nginx
echo -e "${YELLOW}Step 6: Installing Nginx...${NC}"
sudo apt install -y nginx
NGINX_VERSION=$(nginx -v 2>&1)
echo -e "${GREEN}✓ Nginx installed: ${NGINX_VERSION}${NC}"

# Step 7: Clone Repository
echo -e "${YELLOW}Step 7: Cloning repository...${NC}"
cd ~
if [ -d "pern-aws-project" ]; then
    echo -e "${YELLOW}Repository already exists. Pulling latest changes...${NC}"
    cd pern-aws-project
    git pull
else
    git clone https://github.com/ribnuu/pern-aws-project.git
    cd pern-aws-project
fi

echo -e "${GREEN}✓ Repository cloned/updated${NC}"

# Step 8: Navigate to Server directory
cd ~/pern-aws-project/Server
echo -e "${GREEN}✓ Current directory: $(pwd)${NC}"

# Step 9: Create .env file
echo -e "${YELLOW}Step 8: Creating .env file...${NC}"
cat > .env << 'EOL'
# AWS RDS PRODUCTION CONFIGURATION
NODE_ENV=PRODUCTION
PORT=4000

DB_HOST=pos-ccc-db-prod.cromc6kag7po.eu-north-1.rds.amazonaws.com
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=Tmabdulmalik$51
DB_NAME=ccc

# Duke Database Configuration
DB_DUKE_HOST=pos-ccc-db-prod.cromc6kag7po.eu-north-1.rds.amazonaws.com
DB_DUKE_PORT=5432
DB_DUKE_USER=postgres
DB_DUKE_PASSWORD=Tmabdulmalik$51
DB_DUKE_NAME=pos_database_duke

# SMS Provider
HUTCH_SMS_PROVIDER_AUTH_URL=https://bsms.hutch.lk/api/login
HUTCH_SMS_PROVIDER_SEND_SMS_URL=https://bsms.hutch.lk/api/sendsms
HUTCH_SMS_PROVIDER_SEND_RENEW_TOKEN_URL=https://bsms.hutch.lk/api/token/accessToken
HUTCH_SMS_PROVIDER_USER_NAME=ceo@eforce.lk
HUTCH_SMS_PROVIDER_PASSWORD=Aeroplane$1

# Frontend
FRONTEND_HOSTED_URL=http://16.170.208.146
EOL

echo -e "${GREEN}✓ .env file created${NC}"

# Step 10: Install npm dependencies
echo -e "${YELLOW}Step 9: Installing npm dependencies...${NC}"
npm install
echo -e "${GREEN}✓ Dependencies installed${NC}"

# Step 11: Test database connection
echo -e "${YELLOW}Step 10: Testing database connection...${NC}"
PGPASSWORD='Tmabdulmalik$51' psql -h pos-ccc-db-prod.cromc6kag7po.eu-north-1.rds.amazonaws.com -U postgres -d ccc -c "SELECT version();" || {
    echo -e "${RED}✗ Database connection failed!${NC}"
    echo -e "${RED}Please check RDS security group allows EC2 IP${NC}"
    exit 1
}
echo -e "${GREEN}✓ Database connection successful${NC}"

# Step 12: Start backend with PM2
echo -e "${YELLOW}Step 11: Starting backend with PM2...${NC}"
pm2 delete pos-backend 2>/dev/null || true  # Delete if exists
pm2 start index.js --name "pos-backend"
pm2 save
echo -e "${GREEN}✓ Backend started with PM2${NC}"

# Step 13: Setup PM2 startup
echo -e "${YELLOW}Step 12: Setting up PM2 auto-start...${NC}"
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u ubuntu --hp /home/ubuntu
pm2 save
echo -e "${GREEN}✓ PM2 auto-start configured${NC}"

# Step 14: Configure Nginx
echo -e "${YELLOW}Step 13: Configuring Nginx...${NC}"
sudo tee /etc/nginx/sites-available/pos-backend > /dev/null << 'EOL'
server {
    listen 80;
    server_name _;

    location / {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOL

# Enable the site
sudo ln -sf /etc/nginx/sites-available/pos-backend /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Test nginx configuration
sudo nginx -t

# Restart nginx
sudo systemctl restart nginx
sudo systemctl enable nginx

echo -e "${GREEN}✓ Nginx configured and restarted${NC}"

# Step 15: Display status
echo ""
echo "================================================"
echo -e "${GREEN}EC2 Setup Complete!${NC}"
echo "================================================"
echo ""
echo "PM2 Status:"
pm2 status
echo ""
echo "Nginx Status:"
sudo systemctl status nginx --no-pager | head -5
echo ""
echo -e "${GREEN}Backend is running at:${NC}"
echo "  Local: http://localhost:4000"
echo "  Public: http://16.170.208.146"
echo ""
echo -e "${YELLOW}Useful commands:${NC}"
echo "  pm2 logs pos-backend    # View logs"
echo "  pm2 restart pos-backend # Restart backend"
echo "  pm2 status              # Check status"
echo "  sudo systemctl status nginx  # Check Nginx"
echo ""
