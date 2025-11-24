#!/bin/bash
# EC2 Backend Setup Script
# Run this script on your EC2 instance (Delta)

set -e  # Exit on error

echo "=========================================="
echo "POS Backend Deployment Script"
echo "EC2: Delta (16.170.208.146)"
echo "=========================================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Update System
echo -e "${YELLOW}Step 1: Updating system...${NC}"
sudo apt update && sudo apt upgrade -y

# Step 2: Install Node.js
echo -e "${YELLOW}Step 2: Installing Node.js 18.x...${NC}"
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

echo -e "${GREEN}Node.js version:${NC}"
node --version
npm --version

# Step 3: Install PM2
echo -e "${YELLOW}Step 3: Installing PM2...${NC}"
sudo npm install -g pm2

# Step 4: Install Git
echo -e "${YELLOW}Step 4: Installing Git...${NC}"
sudo apt install -y git

# Step 5: Install Nginx
echo -e "${YELLOW}Step 5: Installing Nginx...${NC}"
sudo apt install -y nginx

# Step 6: Clone Repository
echo -e "${YELLOW}Step 6: Cloning repository...${NC}"
if [ -d "pern-aws-project" ]; then
    echo "Repository already exists. Pulling latest changes..."
    cd pern-aws-project
    git pull
    cd ..
else
    git clone https://github.com/ribnuu/pern-aws-project.git
fi

cd pern-aws-project/Server

# Step 7: Create .env file
echo -e "${YELLOW}Step 7: Creating .env file...${NC}"
cat > .env << 'EOF'
NODE_ENV=PRODUCTION
PORT=4000

# Database Configuration
DB_USER=postgres
DB_HOST=pos-ccc-db-prod.cromc6kag7po.eu-north-1.rds.amazonaws.com
DB_NAME=ccc
DB_PASSWORD=Tmabdulmalik$51
DB_PORT=5432

# Duke Database Configuration
DB_DUKE_USER=postgres
DB_DUKE_HOST=pos-ccc-db-prod.cromc6kag7po.eu-north-1.rds.amazonaws.com
DB_DUKE_NAME=pos_database_duke
DB_DUKE_PASSWORD=Tmabdulmalik$51
DB_DUKE_PORT=5432

# CORS Configuration
CORS_ORIGIN=*
EOF

echo -e "${GREEN}.env file created successfully${NC}"

# Step 8: Install npm dependencies
echo -e "${YELLOW}Step 8: Installing npm dependencies...${NC}"
npm install

# Step 9: Setup PM2
echo -e "${YELLOW}Step 9: Starting backend with PM2...${NC}"

# Stop existing process if any
pm2 stop pos-backend 2>/dev/null || true
pm2 delete pos-backend 2>/dev/null || true

# Start new process
pm2 start index.js --name pos-backend

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u ubuntu --hp /home/ubuntu

echo -e "${GREEN}PM2 configured successfully${NC}"
pm2 status

# Step 10: Configure Nginx
echo -e "${YELLOW}Step 10: Configuring Nginx...${NC}"
sudo tee /etc/nginx/sites-available/pos-backend > /dev/null << 'EOF'
server {
    listen 80;
    server_name 16.170.208.146 ec2-16-170-208-146.eu-north-1.compute.amazonaws.com;

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
EOF

# Enable Nginx configuration
sudo ln -sf /etc/nginx/sites-available/pos-backend /etc/nginx/sites-enabled/

# Remove default Nginx site
sudo rm -f /etc/nginx/sites-enabled/default

# Test Nginx configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
sudo systemctl enable nginx

echo -e "${GREEN}Nginx configured successfully${NC}"

echo ""
echo "=========================================="
echo -e "${GREEN}Deployment Complete!${NC}"
echo "=========================================="
echo ""
echo "Backend URL: http://16.170.208.146"
echo "Backend Port: 4000"
echo ""
echo "Useful commands:"
echo "  pm2 logs pos-backend    # View logs"
echo "  pm2 restart pos-backend # Restart backend"
echo "  pm2 status              # Check status"
echo "  pm2 monit               # Monitor in real-time"
echo ""
echo "Test backend:"
echo "  curl http://localhost:4000"
echo "  curl http://16.170.208.146"
echo ""
