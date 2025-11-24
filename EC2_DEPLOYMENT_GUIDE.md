# EC2 Backend Deployment - Quick Reference Guide

## 📋 EC2 Instance Information
- **Name:** Delta
- **Public IP:** `16.170.208.146`
- **Region:** eu-north-1 (Stockholm)
- **Instance Type:** t3.micro
- **OS:** Ubuntu 24.04 LTS
- **Key Pair:** delta-key.pem

## 🚀 Quick Start Deployment

### Option A: Automated Setup (Recommended)

#### Step 1: Connect to EC2
```powershell
# On Windows - Set SSH key permissions (Run as Administrator)
cd path\to\your\delta-key.pem
icacls .\delta-key.pem /reset
icacls .\delta-key.pem /grant:r "$env:USERNAME":"(R)"
icacls .\delta-key.pem /inheritance:r

# Connect via SSH
ssh -i "delta-key.pem" ubuntu@16.170.208.146
```

When prompted "Are you sure you want to continue connecting", type `yes`

#### Step 2: Run Automated Setup Script
```bash
# On EC2 instance
cd ~
wget https://raw.githubusercontent.com/ribnuu/pern-aws-project/main/ec2-setup.sh
chmod +x ec2-setup.sh
./ec2-setup.sh
```

### Option B: Manual Setup

#### Step 1: Connect to EC2 (Same as above)

#### Step 2: Update System & Install Dependencies
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2, Git, PostgreSQL Client, Nginx
sudo npm install -g pm2
sudo apt install -y git postgresql-client nginx

# Verify installations
node --version    # Should show v18.x
npm --version
pm2 --version
nginx -v
```

#### Step 3: Clone Repository
```bash
cd ~
git clone https://github.com/ribnuu/pern-aws-project.git
cd pern-aws-project/Server
```

#### Step 4: Create .env File
```bash
nano .env
```

Paste this content:
```env
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
```

Save: `Ctrl+O`, Enter, then `Ctrl+X` to exit

#### Step 5: Test Database Connection
```bash
PGPASSWORD='Tmabdulmalik$51' psql -h pos-ccc-db-prod.cromc6kag7po.eu-north-1.rds.amazonaws.com -U postgres -d ccc -c "SELECT version();"
```

**Important:** If this fails, check AWS RDS Security Group:
- Go to AWS Console → RDS → Database → Security Groups
- Add inbound rule: PostgreSQL (5432) from EC2 security group or EC2 IP

#### Step 6: Install Dependencies & Start Backend
```bash
# Install npm packages
npm install

# Start with PM2
pm2 start index.js --name "pos-backend"

# View logs (check for "Connected to database" messages)
pm2 logs pos-backend --lines 50
```

If you see errors, press `Ctrl+C` and check logs again.

#### Step 7: Configure PM2 Auto-Start
```bash
pm2 startup
pm2 save
```

#### Step 8: Configure Nginx
```bash
sudo nano /etc/nginx/sites-available/pos-backend
```

Paste this configuration:
```nginx
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
```

Save and exit (`Ctrl+O`, Enter, `Ctrl+X`)

#### Step 9: Enable Nginx Configuration
```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/pos-backend /etc/nginx/sites-enabled/

# Remove default config
sudo rm /etc/nginx/sites-enabled/default

# Test configuration
sudo nginx -t

# Restart nginx
sudo systemctl restart nginx
sudo systemctl enable nginx

# Check status
sudo systemctl status nginx
```

#### Step 10: Test Backend API
From your **local Windows machine**:
```powershell
# Test basic connectivity
curl http://16.170.208.146/

# Or open in browser
Start-Process "http://16.170.208.146/"
```

## 🔧 Important AWS Security Group Configuration

### RDS Security Group
Your RDS must allow connections from EC2:

1. Go to **AWS Console → RDS → Databases**
2. Click on `pos-ccc-db-prod`
3. Click on the **VPC security group**
4. Edit **Inbound rules**
5. Add rule:
   - **Type:** PostgreSQL
   - **Port:** 5432
   - **Source:** EC2 security group (sg-xxx) OR EC2 Private IP (172.31.40.107/32)
   - **Description:** Allow from EC2 Delta instance

### EC2 Security Group
Your EC2 instance already has these rules (verify):
- SSH (22) - From your IP
- HTTP (80) - From anywhere (0.0.0.0/0)
- HTTPS (443) - From anywhere (0.0.0.0/0)

## 📊 Monitoring & Troubleshooting

### Check Backend Status
```bash
# On EC2
pm2 status
pm2 logs pos-backend
```

### Check Nginx Status
```bash
sudo systemctl status nginx
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```

### Restart Services
```bash
# Restart backend
pm2 restart pos-backend

# Restart Nginx
sudo systemctl restart nginx

# View backend logs
pm2 logs pos-backend --lines 100
```

### Test Database Connection
```bash
PGPASSWORD='Tmabdulmalik$51' psql -h pos-ccc-db-prod.cromc6kag7po.eu-north-1.rds.amazonaws.com -U postgres -d ccc
```

### Common Issues

#### 1. Database Connection Timeout
**Problem:** Backend can't connect to RDS
**Solution:** Update RDS security group to allow EC2 IP

#### 2. Port 4000 Already in Use
**Problem:** Backend won't start
**Solution:**
```bash
pm2 delete pos-backend
sudo lsof -i :4000
sudo kill -9 <PID>
pm2 start index.js --name "pos-backend"
```

#### 3. Nginx 502 Bad Gateway
**Problem:** Nginx can't reach backend
**Solution:**
```bash
# Check if backend is running
pm2 status
pm2 restart pos-backend

# Check Nginx config
sudo nginx -t
sudo systemctl restart nginx
```

## 🔄 Updating Deployment

When you push changes to GitHub:
```bash
# On EC2
cd ~/pern-aws-project
git pull
cd Server
npm install  # Only if package.json changed
pm2 restart pos-backend
```

## 🎯 Next Steps

After backend is running:
1. ✅ Test API endpoints: `http://16.170.208.146/api/...`
2. Update frontend `.env` to point to EC2 IP
3. Deploy frontend to S3/CloudFront
4. Configure custom domain (optional)
5. Setup SSL/HTTPS with Let's Encrypt (optional)

## 📝 Useful PM2 Commands

```bash
pm2 list                    # List all processes
pm2 status                  # Show status
pm2 logs pos-backend        # View logs
pm2 logs pos-backend --err  # View error logs only
pm2 restart pos-backend     # Restart
pm2 stop pos-backend        # Stop
pm2 delete pos-backend      # Remove from PM2
pm2 monit                   # Real-time monitoring
pm2 save                    # Save current process list
```

## 🌐 Testing Checklist

- [ ] SSH connection works
- [ ] Node.js and npm installed
- [ ] PM2 installed and running
- [ ] Repository cloned
- [ ] .env file created with correct credentials
- [ ] Database connection successful
- [ ] npm install completed
- [ ] Backend started with PM2
- [ ] PM2 auto-start configured
- [ ] Nginx installed and configured
- [ ] Backend accessible via public IP
- [ ] API endpoints return expected responses

## 📞 Support

If you encounter issues:
1. Check PM2 logs: `pm2 logs pos-backend`
2. Check Nginx logs: `sudo tail -f /var/log/nginx/error.log`
3. Verify security groups in AWS Console
4. Test database connection from EC2
