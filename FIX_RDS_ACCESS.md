# 🔐 Fix RDS Security Group Access

## Problem

Connection to RDS is timing out. This means the security group is blocking your connection.

## Solution: Update Security Group via AWS Console

### Step 1: Go to RDS Security Group

1. Open AWS Console
2. Go to **RDS** service
3. Click on your database: **pos-ccc-db-prod**
4. Click on the **VPC security groups** link under "Connectivity & security"
   - It should show: `default (sg-07132512f16590f0c)`

### Step 2: Add Inbound Rule

1. You'll be redirected to EC2 → Security Groups
2. Select the security group: `sg-07132512f16590f0c`
3. Click **"Inbound rules"** tab at the bottom
4. Click **"Edit inbound rules"** button

### Step 3: Add PostgreSQL Rule

Click **"Add rule"** and enter:

```
Type: PostgreSQL
Protocol: TCP
Port range: 5432
Source: My IP (or Custom: 0.0.0.0/0 for testing)
Description: Allow PostgreSQL access
```

**Important:**

- Use "My IP" for better security (AWS will auto-detect your IP)
- Or temporarily use "0.0.0.0/0" (anywhere) for testing, then restrict later

5. Click **"Save rules"**

---

## Alternative: Use AWS CLI

```powershell
# Get your current IP
$myIp = (Invoke-RestMethod -Uri "https://api.ipify.org?format=text")
Write-Host "Your IP: $myIp"

# Add inbound rule
aws ec2 authorize-security-group-ingress `
    --group-id sg-07132512f16590f0c `
    --protocol tcp `
    --port 5432 `
    --cidr "$myIp/32"
```

---

## Verify Connection After Fix

```powershell
# Test connection
$env:PGPASSWORD = "Tmabdulmalik`$51"
psql -h pos-ccc-db-prod.cromc6kag7po.eu-north-1.rds.amazonaws.com -U postgres -p 5432 -d postgres -c "SELECT version();"
```

**Expected Output:**

```
                                                version
--------------------------------------------------------------------------------------------------------
 PostgreSQL 14.13 on aarch64-unknown-linux-gnu, compiled by aarch64-unknown-linux-gnu-gcc ...
(1 row)
```

---

## Current Security Group Details

- **Security Group ID:** sg-07132512f16590f0c
- **VPC:** vpc-00053cbd77b05c087
- **Region:** eu-north-1

---

## Quick Checklist

- [ ] Navigate to RDS Console
- [ ] Find database: pos-ccc-db-prod
- [ ] Click on security group link
- [ ] Edit inbound rules
- [ ] Add PostgreSQL rule for your IP
- [ ] Save rules
- [ ] Test connection with psql
- [ ] Proceed with migration

---

## Screenshots Reference

### 1. RDS Database Page

![RDS Page](Look for "Connectivity & security" section)

- Endpoint: pos-ccc-db-prod.cromc6kag7po.eu-north-1.rds.amazonaws.com
- VPC security groups: default (sg-07132512f16590f0c) ← Click this

### 2. Security Group Rules

![Security Rules](Should see inbound rules tab)

- Click "Edit inbound rules"
- Click "Add rule"
- Select "PostgreSQL" type
- Choose "My IP" or enter custom IP
- Save

---

## After Migration Success

Once your application is working with RDS, **secure your database**:

1. **Remove public access:**

   ```
   RDS Console → Modify → Public accessibility → No
   ```

2. **Restrict security group:**

   ```
   Remove: 0.0.0.0/0 (if used)
   Add: EC2 instance security group only
   ```

3. **Use VPC peering or VPN** for remote access

---

## Need Help?

If you're still having issues:

1. Check if RDS status is "Available"
2. Verify "Publicly accessible" is set to "Yes"
3. Check VPC and subnet configuration
4. Try from a different network
5. Check AWS CloudWatch logs
