# EC2 Backend Deployment - Quick Start Guide

## 🚀 EC2 Instance Details
- **Name:** Delta
- **Instance ID:** i-0a12b230afd28eda6
- **Public IP:** 16.170.208.146
- **Public DNS:** ec2-16-170-208-146.eu-north-1.compute.amazonaws.com
- **Region:** eu-north-1 (Stockholm)
- **Instance Type:** t3.micro
- **OS:** Ubuntu 24.04 LTS

## 📋 Prerequisites Checklist
- [x] EC2 instance created and running
- [ ] SSH key file (`delta-key.pem`) downloaded
- [ ] RDS security group allows EC2 access
- [ ] EC2 security group allows ports 80, 443, 4000

## 🔐 Step 1: Connect to EC2

### From Windows PowerShell/Command Prompt:
```powershell
# If using PuTTY, convert .pem to .ppk first
# Otherwise, use Git Bash or WSL

ssh -i "delta-key.pem" ubuntu@16.170.208.146
```

### From Git Bash or WSL:
```bash
# Set correct permissions for key file
chmod 400 delta-key.pem

# Connect to EC2
ssh -i "delta-key.pem" ubuntu@16.170.208.146
```

## 🛠️ Step 2: Automated Setup (Recommended)

Once connected to EC2, run:

```bash
# Download the setup script
wget https://raw.githubusercontent.com/ribnuu/pern-aws-project/main/ec2-setup.sh

# Make it executable
chmod +x ec2-setup.sh

# Run the script
./ec2-setup.sh
```

**The script will automatically:**
1. Update system packages
2. Install Node.js 18.x
3. Install PM2 process manager
4. Install Git and Nginx
5. Clone your repository
6. Create `.env` file with correct configuration
7. Install npm dependencies
8. Start backend with PM2
9. Configure Nginx reverse proxy

## 🔧 Step 3: Manual Setup (Alternative)

If you prefer manual setup, follow these commands:

### 3.1 Update System
```bash
sudo apt update && sudo apt upgrade -y
```

### 3.2 Install Node.js
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
node --version  # Should show v18.x
```

### 3.3 Install PM2 and Git
```bash
sudo npm install -g pm2
sudo apt install -y git nginx
```

### 3.4 Clone Repository
```bash
git clone https://github.com/ribnuu/pern-aws-project.git
cd pern-aws-project/Server
```

### 3.5 Create .env File
```bash
nano .env
```

Paste this content:
```env
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
```

Save: `Ctrl+X`, then `Y`, then `Enter`

### 3.6 Install Dependencies and Start
```bash
npm install
pm2 start index.js --name pos-backend
pm2 save
pm2 startup
```

### 3.7 Configure Nginx
```bash
sudo nano /etc/nginx/sites-available/pos-backend
```

Paste this:
```nginx
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
```

Enable and start:
```bash
sudo ln -s /etc/nginx/sites-available/pos-backend /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx
sudo systemctl enable nginx
```

## 🔒 Step 4: Update RDS Security Group

### CRITICAL: Allow EC2 to Access RDS

1. Go to AWS Console → EC2 → Instances
2. Click on "Delta" instance
3. Go to **Security** tab
4. Note the **Security Group ID** (something like `sg-xxxxxxxxx`)

5. Go to AWS Console → RDS → Databases
6. Click on `pos-ccc-db-prod`
7. Go to **Connectivity & security** tab
8. Click on the **VPC security groups** link (sg-07132512f16590f0c)
9. Click **Edit inbound rules**
10. Add/Update rule:
    - **Type:** PostgreSQL
    - **Port:** 5432
    - **Source:** Custom → Select the EC2 security group ID from step 4
    - **Description:** Allow from EC2 Delta instance
11. Click **Save rules**

### Also Add Your Current IP (for local testing):
- **Type:** PostgreSQL
- **Port:** 5432
- **Source:** My IP (123.231.63.172/32)
- **Description:** Allow from local development

## ✅ Step 5: Verify Deployment

### On EC2:
```bash
# Check PM2 status
pm2 status
pm2 logs pos-backend

# Test local connection
curl http://localhost:4000

# Check Nginx status
sudo systemctl status nginx
```

### From Your Browser:
- Backend API: http://16.170.208.146/
- Or: http://ec2-16-170-208-146.eu-north-1.compute.amazonaws.com/

### Test Database Connection:
```bash
# On EC2, run:
cd ~/pern-aws-project/Server
node -e "const db = require('./config/db'); db.client.connect().then(() => console.log('DB Connected!')).catch(err => console.error(err));"
```

## 🎯 Step 6: Update Frontend Configuration

Update your local `client/.env` file:
```env
VITE_NODE_SERVER_ENDPOINT=http://16.170.208.146
```

Restart your local frontend:
```powershell
cd C:\ccc\client
npm run dev
```

## 📊 Useful PM2 Commands

```bash
pm2 list                  # List all processes
pm2 logs pos-backend      # View real-time logs
pm2 logs pos-backend --lines 100  # View last 100 lines
pm2 restart pos-backend   # Restart backend
pm2 stop pos-backend      # Stop backend
pm2 start pos-backend     # Start backend
pm2 delete pos-backend    # Remove process
pm2 monit                 # Real-time monitoring
pm2 save                  # Save current process list
```

## 🔄 Updating Your Code on EC2

When you push changes to GitHub:

```bash
# SSH into EC2
ssh -i "delta-key.pem" ubuntu@16.170.208.146

# Navigate to project
cd pern-aws-project/Server

# Pull latest changes
git pull

# Install any new dependencies
npm install

# Restart backend
pm2 restart pos-backend

# Check logs
pm2 logs pos-backend
```

## 🐛 Troubleshooting

### Backend Not Starting
```bash
pm2 logs pos-backend --err  # Check error logs
pm2 restart pos-backend     # Try restarting
```

### Database Connection Issues
```bash
# Test RDS connectivity
nc -zv pos-ccc-db-prod.cromc6kag7po.eu-north-1.rds.amazonaws.com 5432

# Check .env file
cat .env

# Verify security group allows EC2 access
```

### Nginx Issues
```bash
sudo nginx -t               # Test configuration
sudo systemctl status nginx # Check status
sudo tail -f /var/log/nginx/error.log  # View errors
```

### Port 4000 Not Accessible
Check EC2 Security Group allows port 4000 from your IP:
1. EC2 Console → Security Groups
2. Find the security group attached to Delta
3. Edit Inbound Rules
4. Add: Custom TCP, Port 4000, Source: 0.0.0.0/0

## 📝 Architecture Overview

```
Internet
    ↓
Nginx (Port 80) on EC2
    ↓
Node.js Backend (Port 4000) on EC2
    ↓
PostgreSQL RDS (Port 5432)
```

## 🎉 Success Indicators

✅ PM2 shows "online" status
✅ `curl http://localhost:4000` returns response
✅ Backend logs show "Connected to the ccc database"
✅ Backend logs show "Connected to the duke database"
✅ Browser can access http://16.170.208.146/
✅ Frontend can make API calls to EC2 backend

## 📞 Quick Reference

| Resource | Value |
|----------|-------|
| EC2 Public IP | 16.170.208.146 |
| EC2 DNS | ec2-16-170-208-146.eu-north-1.compute.amazonaws.com |
| Backend Port | 4000 |
| RDS Endpoint | pos-ccc-db-prod.cromc6kag7po.eu-north-1.rds.amazonaws.com |
| RDS Port | 5432 |
| Database 1 | ccc |
| Database 2 | pos_database_duke |
| Region | eu-north-1 (Stockholm) |

---

**Need help?** Check PM2 logs: `pm2 logs pos-backend`
