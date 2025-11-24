# EC2 Backend Deployment Script for Windows
# ============================================
# EC2 Instance: Delta
# Public IP: 16.170.208.146
# Region: eu-north-1

$EC2_IP = "16.170.208.146"
$KEY_FILE = "delta-key.pem"
$GITHUB_REPO = "https://github.com/ribnuu/pern-aws-project.git"

Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "EC2 Backend Deployment Guide" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "STEP 1: Configure SSH Key" -ForegroundColor Yellow
Write-Host "Run these commands in PowerShell (as Administrator):" -ForegroundColor White
Write-Host ""
Write-Host "cd path\to\your\delta-key.pem" -ForegroundColor Green
Write-Host "icacls .\delta-key.pem /reset" -ForegroundColor Green
Write-Host "icacls .\delta-key.pem /grant:r `"`$env:USERNAME`":`"(R)`"" -ForegroundColor Green
Write-Host "icacls .\delta-key.pem /inheritance:r" -ForegroundColor Green
Write-Host ""

Write-Host "STEP 2: Connect to EC2" -ForegroundColor Yellow
Write-Host "ssh -i `"delta-key.pem`" ubuntu@$EC2_IP" -ForegroundColor Green
Write-Host ""
Write-Host "When prompted 'Are you sure you want to continue connecting', type: yes" -ForegroundColor Cyan
Write-Host ""

Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "Commands to run ON EC2 INSTANCE" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "STEP 3: Update System & Install Node.js" -ForegroundColor Yellow
Write-Host @"
sudo apt update && sudo apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
node --version
npm --version
"@ -ForegroundColor Green
Write-Host ""

Write-Host "STEP 4: Install PM2, Git, PostgreSQL Client, Nginx" -ForegroundColor Yellow
Write-Host @"
sudo npm install -g pm2
sudo apt install -y git postgresql-client nginx
pm2 --version
nginx -v
"@ -ForegroundColor Green
Write-Host ""

Write-Host "STEP 5: Clone Repository" -ForegroundColor Yellow
Write-Host @"
cd ~
git clone $GITHUB_REPO
cd pern-aws-project/Server
ls -la
"@ -ForegroundColor Green
Write-Host ""

Write-Host "STEP 6: Create .env File" -ForegroundColor Yellow
Write-Host "nano .env" -ForegroundColor Green
Write-Host ""
Write-Host "Paste the following content (Ctrl+Shift+V):" -ForegroundColor Cyan
Write-Host @"

# AWS RDS PRODUCTION CONFIGURATION
NODE_ENV=PRODUCTION
PORT=4000

DB_HOST=pos-ccc-db-prod.cromc6kag7po.eu-north-1.rds.amazonaws.com
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=Tmabdulmalik`$51
DB_NAME=ccc

# Duke Database Configuration
DB_DUKE_HOST=pos-ccc-db-prod.cromc6kag7po.eu-north-1.rds.amazonaws.com
DB_DUKE_PORT=5432
DB_DUKE_USER=postgres
DB_DUKE_PASSWORD=Tmabdulmalik`$51
DB_DUKE_NAME=pos_database_duke

# SMS Provider
HUTCH_SMS_PROVIDER_AUTH_URL=https://bsms.hutch.lk/api/login
HUTCH_SMS_PROVIDER_SEND_SMS_URL=https://bsms.hutch.lk/api/sendsms
HUTCH_SMS_PROVIDER_SEND_RENEW_TOKEN_URL=https://bsms.hutch.lk/api/token/accessToken
HUTCH_SMS_PROVIDER_USER_NAME=ceo@eforce.lk
HUTCH_SMS_PROVIDER_PASSWORD=Aeroplane`$1

# Frontend (will update after CloudFront)
FRONTEND_HOSTED_URL=http://16.170.208.146

"@ -ForegroundColor White
Write-Host ""
Write-Host "Save: Ctrl+O, Enter, Exit: Ctrl+X" -ForegroundColor Cyan
Write-Host ""

Write-Host "STEP 7: Test Database Connection" -ForegroundColor Yellow
Write-Host @"
PGPASSWORD='Tmabdulmalik`$51' psql -h pos-ccc-db-prod.cromc6kag7po.eu-north-1.rds.amazonaws.com -U postgres -d ccc -c '\dt'
"@ -ForegroundColor Green
Write-Host ""

Write-Host "STEP 8: Install Dependencies & Start Backend" -ForegroundColor Yellow
Write-Host @"
npm install
pm2 start index.js --name "pos-backend"
pm2 logs pos-backend --lines 50
"@ -ForegroundColor Green
Write-Host ""

Write-Host "If logs show database connection success, proceed to next step" -ForegroundColor Cyan
Write-Host "If errors occur, check .env file and RDS security group" -ForegroundColor Red
Write-Host ""

Write-Host "STEP 9: Setup PM2 Auto-Start" -ForegroundColor Yellow
Write-Host @"
pm2 startup
pm2 save
"@ -ForegroundColor Green
Write-Host ""

Write-Host "STEP 10: Configure Nginx" -ForegroundColor Yellow
Write-Host "sudo nano /etc/nginx/sites-available/pos-backend" -ForegroundColor Green
Write-Host ""
Write-Host "Paste this configuration:" -ForegroundColor Cyan
Write-Host @"

server {
    listen 80;
    server_name _;

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

"@ -ForegroundColor White
Write-Host "Save: Ctrl+O, Enter, Exit: Ctrl+X" -ForegroundColor Cyan
Write-Host ""

Write-Host "STEP 11: Enable Nginx Configuration" -ForegroundColor Yellow
Write-Host @"
sudo ln -s /etc/nginx/sites-available/pos-backend /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx
sudo systemctl enable nginx
sudo systemctl status nginx
"@ -ForegroundColor Green
Write-Host ""

Write-Host "STEP 12: Test Backend API" -ForegroundColor Yellow
Write-Host "From your local Windows machine:" -ForegroundColor Cyan
Write-Host "curl http://$EC2_IP/" -ForegroundColor Green
Write-Host ""

Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "Deployment Complete!" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Your backend should be accessible at: http://$EC2_IP" -ForegroundColor Yellow
Write-Host ""
Write-Host "Useful PM2 Commands (run on EC2):" -ForegroundColor Cyan
Write-Host "pm2 status              # Check status" -ForegroundColor White
Write-Host "pm2 logs pos-backend    # View logs" -ForegroundColor White
Write-Host "pm2 restart pos-backend # Restart backend" -ForegroundColor White
Write-Host "pm2 stop pos-backend    # Stop backend" -ForegroundColor White
Write-Host "pm2 delete pos-backend  # Remove from PM2" -ForegroundColor White
Write-Host ""
