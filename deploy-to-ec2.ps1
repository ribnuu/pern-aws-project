# EC2 Deployment Script for POS Backend
# EC2 Instance: Delta (i-0a12b230afd28eda6)
# Public IP: 16.170.208.146
# Region: eu-north-1 (Stockholm)

# Configuration
$EC2_IP = "16.170.208.146"
$KEY_FILE = "delta-key.pem"  # Update with your actual key file path
$GITHUB_REPO = "https://github.com/ribnuu/pern-aws-project.git"

Write-Host "=== POS Backend Deployment to AWS EC2 ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "EC2 Instance: Delta" -ForegroundColor Green
Write-Host "Public IP: $EC2_IP" -ForegroundColor Green
Write-Host "Region: eu-north-1 (Stockholm)" -ForegroundColor Green
Write-Host ""

# Instructions for manual deployment
Write-Host "STEP 1: Connect to EC2 Instance" -ForegroundColor Yellow
Write-Host "Run this command in PowerShell or Git Bash:" -ForegroundColor White
Write-Host "ssh -i `"$KEY_FILE`" ubuntu@$EC2_IP" -ForegroundColor Cyan
Write-Host ""

Write-Host "STEP 2: Update System and Install Dependencies" -ForegroundColor Yellow
Write-Host "Copy and paste these commands on EC2:" -ForegroundColor White
Write-Host @"
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Verify Node.js installation
node --version
npm --version

# Install PM2 (Process Manager)
sudo npm install -g pm2

# Install Git
sudo apt install -y git

# Install Nginx
sudo apt install -y nginx
"@ -ForegroundColor Cyan
Write-Host ""

Write-Host "STEP 3: Clone Repository and Setup" -ForegroundColor Yellow
Write-Host @"
# Clone your repository
git clone $GITHUB_REPO
cd pern-aws-project/Server

# Create .env file
nano .env
"@ -ForegroundColor Cyan
Write-Host ""

Write-Host "STEP 4: Environment Variables (.env file content)" -ForegroundColor Yellow
Write-Host "Copy this content into .env:" -ForegroundColor White
Write-Host @"
NODE_ENV=PRODUCTION
PORT=4000

# Database Configuration
DB_USER=postgres
DB_HOST=pos-ccc-db-prod.cromc6kag7po.eu-north-1.rds.amazonaws.com
DB_NAME=ccc
DB_PASSWORD=Tmabdulmalik`$51
DB_PORT=5432

# Duke Database Configuration
DB_DUKE_USER=postgres
DB_DUKE_HOST=pos-ccc-db-prod.cromc6kag7po.eu-north-1.rds.amazonaws.com
DB_DUKE_NAME=pos_database_duke
DB_DUKE_PASSWORD=Tmabdulmalik`$51
DB_DUKE_PORT=5432

# CORS Configuration
CORS_ORIGIN=*
"@ -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+X, then Y, then Enter to save" -ForegroundColor White
Write-Host ""

Write-Host "STEP 5: Install Dependencies and Start Backend" -ForegroundColor Yellow
Write-Host @"
# Install npm dependencies
npm install

# Start with PM2
pm2 start index.js --name pos-backend

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
# Copy and run the command PM2 provides

# Check status
pm2 status
pm2 logs pos-backend
"@ -ForegroundColor Cyan
Write-Host ""

Write-Host "STEP 6: Configure Nginx Reverse Proxy" -ForegroundColor Yellow
Write-Host @"
# Create Nginx configuration
sudo nano /etc/nginx/sites-available/pos-backend
"@ -ForegroundColor Cyan
Write-Host ""
Write-Host "Nginx configuration content:" -ForegroundColor White
Write-Host @"
server {
    listen 80;
    server_name 16.170.208.146 ec2-16-170-208-146.eu-north-1.compute.amazonaws.com;

    location / {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade `$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host `$host;
        proxy_cache_bypass `$http_upgrade;
        proxy_set_header X-Real-IP `$remote_addr;
        proxy_set_header X-Forwarded-For `$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto `$scheme;
    }
}
"@ -ForegroundColor Cyan
Write-Host ""
Write-Host "Then run:" -ForegroundColor White
Write-Host @"
# Enable configuration
sudo ln -s /etc/nginx/sites-available/pos-backend /etc/nginx/sites-enabled/

# Test Nginx configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx

# Enable Nginx to start on boot
sudo systemctl enable nginx
"@ -ForegroundColor Cyan
Write-Host ""

Write-Host "STEP 7: Update Security Group for RDS Access" -ForegroundColor Yellow
Write-Host "Go to AWS Console → RDS → Security Groups → sg-07132512f16590f0c" -ForegroundColor White
Write-Host "Add Inbound Rule:" -ForegroundColor White
Write-Host "  Type: PostgreSQL" -ForegroundColor Cyan
Write-Host "  Port: 5432" -ForegroundColor Cyan
Write-Host "  Source: EC2 Security Group (sg-0f1e3b4d5c6a7b8c9 or the one assigned to Delta)" -ForegroundColor Cyan
Write-Host ""

Write-Host "STEP 8: Test Backend" -ForegroundColor Yellow
Write-Host "From EC2:" -ForegroundColor White
Write-Host "curl http://localhost:4000" -ForegroundColor Cyan
Write-Host ""
Write-Host "From your browser:" -ForegroundColor White
Write-Host "http://16.170.208.146/" -ForegroundColor Cyan
Write-Host ""

Write-Host "=== Useful PM2 Commands ===" -ForegroundColor Yellow
Write-Host @"
pm2 list                  # List all processes
pm2 logs pos-backend      # View logs
pm2 restart pos-backend   # Restart backend
pm2 stop pos-backend      # Stop backend
pm2 delete pos-backend    # Delete process
pm2 monit                 # Monitor in real-time
"@ -ForegroundColor Cyan
Write-Host ""

Write-Host "=== Quick Reference ===" -ForegroundColor Yellow
Write-Host "EC2 Public IP: http://16.170.208.146" -ForegroundColor Green
Write-Host "EC2 Public DNS: http://ec2-16-170-208-146.eu-north-1.compute.amazonaws.com" -ForegroundColor Green
Write-Host "Backend Port: 4000" -ForegroundColor Green
Write-Host "RDS Endpoint: pos-ccc-db-prod.cromc6kag7po.eu-north-1.rds.amazonaws.com" -ForegroundColor Green
Write-Host ""

Write-Host "Ready to deploy? Copy the commands above and run them on your EC2 instance!" -ForegroundColor Green
