# AWS RDS Security Group Configuration

# =======================================

# This guide helps you allow EC2 instance to connect to RDS

## 🔒 Security Group Update Required

Your EC2 instance needs permission to connect to your RDS database.

### EC2 Instance Details

- **Instance ID:** i-0a12b230afd28eda6
- **Private IP:** 172.31.40.107
- **Public IP:** 16.170.208.146
- **Security Group:** Check EC2 console

### RDS Instance Details

- **Endpoint:** pos-ccc-db-prod.cromc6kag7po.eu-north-1.rds.amazonaws.com
- **Current Security Group:** sg-07132512f16590f0c
- **Region:** eu-north-1 (Stockholm)

## 📝 Steps to Update RDS Security Group

### Option 1: Via AWS Console (Recommended)

1. **Go to AWS RDS Console**

   - Navigate to: https://eu-north-1.console.aws.amazon.com/rds/
   - Region: eu-north-1 (Stockholm)

2. **Select Your Database**

   - Click on database: `pos-ccc-db-prod`
   - Go to **Connectivity & security** tab

3. **Edit Security Group**

   - Under "Security", click on the security group link (sg-07132512f16590f0c)
   - This opens EC2 Security Groups page

4. **Edit Inbound Rules**

   - Click **Edit inbound rules** button
   - Look for existing PostgreSQL rule (port 5432)

5. **Add EC2 Access Rule**

   - Click **Add rule**
   - Configure:
     - **Type:** PostgreSQL
     - **Protocol:** TCP
     - **Port:** 5432
     - **Source:** Choose one of these options:

   **Option A: By Security Group (Recommended for Production)**

   - Type: Custom
   - Source: Select EC2 instance's security group
   - Description: "Allow from EC2 Delta instance"

   **Option B: By Private IP (More Restrictive)**

   - Type: Custom
   - Source: 172.31.40.107/32
   - Description: "Allow from EC2 Delta private IP"

   **Option C: By Public IP (If private IP doesn't work)**

   - Type: Custom
   - Source: 16.170.208.146/32
   - Description: "Allow from EC2 Delta public IP"

6. **Save Rules**
   - Click **Save rules**
   - Wait 10-20 seconds for changes to apply

### Option 2: Via AWS CLI

```bash
# Get EC2 security group ID
EC2_SG=$(aws ec2 describe-instances \
  --instance-ids i-0a12b230afd28eda6 \
  --region eu-north-1 \
  --query 'Reservations[0].Instances[0].SecurityGroups[0].GroupId' \
  --output text)

echo "EC2 Security Group: $EC2_SG"

# Add rule to RDS security group
aws ec2 authorize-security-group-ingress \
  --region eu-north-1 \
  --group-id sg-07132512f16590f0c \
  --protocol tcp \
  --port 5432 \
  --source-group $EC2_SG \
  --group-owner-id 287636331866
```

## ✅ Verify Connection

After updating the security group, test the connection from EC2:

```bash
# SSH into EC2
ssh -i "delta-key.pem" ubuntu@16.170.208.146

# Test database connection
PGPASSWORD='Tmabdulmalik$51' psql \
  -h pos-ccc-db-prod.cromc6kag7po.eu-north-1.rds.amazonaws.com \
  -U postgres \
  -d ccc \
  -c "SELECT version();"
```

Expected output:

```
PostgreSQL 14.13 on aarch64-unknown-linux-gnu...
```

## 🚨 Troubleshooting

### Connection Still Fails?

1. **Check VPC Configuration**

   ```bash
   # Both EC2 and RDS should be in same VPC
   # EC2 VPC: vpc-00053cbd77b05c087
   # RDS VPC: (check in RDS console)
   ```

2. **Check Network ACLs**

   - Go to VPC → Network ACLs
   - Ensure port 5432 is allowed

3. **Check RDS Public Accessibility**

   - RDS → Database → Connectivity
   - If "Publicly accessible" is No, EC2 must be in same VPC

4. **Verify Security Group Changes Applied**

   - Wait 20-30 seconds after making changes
   - Check the inbound rules list shows your new rule

5. **Check EC2 Outbound Rules**
   - EC2 Security Group → Outbound rules
   - Should allow all traffic or at least PostgreSQL (5432)

### Still Not Working?

Run diagnostics from EC2:

```bash
# Check if port 5432 is reachable
nc -zv pos-ccc-db-prod.cromc6kag7po.eu-north-1.rds.amazonaws.com 5432

# Check DNS resolution
nslookup pos-ccc-db-prod.cromc6kag7po.eu-north-1.rds.amazonaws.com

# Check routing
traceroute pos-ccc-db-prod.cromc6kag7po.eu-north-1.rds.amazonaws.com
```

## 📊 Current Security Group Rules Should Include

### RDS Security Group (sg-07132512f16590f0c)

**Inbound Rules:**
| Type | Protocol | Port | Source | Description |
|------|----------|------|--------|-------------|
| PostgreSQL | TCP | 5432 | EC2 SG or 172.31.40.107/32 | Allow from EC2 Delta |
| PostgreSQL | TCP | 5432 | Your development IP/32 | Allow from dev machine (optional) |

**Outbound Rules:**
| Type | Protocol | Port | Destination | Description |
|------|----------|------|-------------|-------------|
| All traffic | All | All | 0.0.0.0/0 | Allow all outbound |

### EC2 Security Group (check in EC2 console)

**Inbound Rules:**
| Type | Protocol | Port | Source | Description |
|------|----------|------|--------|-------------|
| SSH | TCP | 22 | Your IP/32 | SSH access |
| HTTP | TCP | 80 | 0.0.0.0/0 | Public access |
| HTTPS | TCP | 443 | 0.0.0.0/0 | Public access (future) |

**Outbound Rules:**
| Type | Protocol | Port | Destination | Description |
|------|----------|------|-------------|-------------|
| All traffic | All | All | 0.0.0.0/0 | Allow all outbound |

## 🎯 Best Practices

1. **Use Security Group References** (not IPs)

   - More secure and flexible
   - Automatically updates if instances change

2. **Separate Security Groups**

   - One for EC2 (web tier)
   - One for RDS (database tier)
   - Follow principle of least privilege

3. **Document Changes**

   - Use descriptive names for rules
   - Add descriptions explaining purpose

4. **Regular Audits**
   - Review security groups quarterly
   - Remove unused rules

## 📞 Quick Reference

```bash
# Test from local Windows machine
ssh -i "delta-key.pem" ubuntu@16.170.208.146

# Test from EC2
PGPASSWORD='Tmabdulmalik$51' psql -h pos-ccc-db-prod.cromc6kag7po.eu-north-1.rds.amazonaws.com -U postgres -d ccc

# View backend logs
pm2 logs pos-backend

# Restart backend
pm2 restart pos-backend
```

---

**Important:** After updating the security group, the EC2 instance should be able to connect to RDS immediately. If not, there may be VPC or network ACL issues that need investigation.
