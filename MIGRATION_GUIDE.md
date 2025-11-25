# Manual Database Migration Guide

# RDS Instance: pos-ccc-db-prod.cromc6kag7po.eu-north-1.rds.amazonaws.com

## Prerequisites

1. Install PostgreSQL tools (pg_dump, psql) if not already installed
2. Ensure RDS security group allows your IP on port 5432

---

## Step 1: Export Current Databases

### Export main database (ccc)

```powershell
# Set password to avoid prompts
$env:PGPASSWORD = "your-current-db-password"

# Create backup directory
New-Item -ItemType Directory -Path "C:\ccc\db_backups" -Force

# Export database (adjust host if needed)
pg_dump -h localhost -U postgres -p 5432 -d database -F c -b -v -f "C:\ccc\db_backups\ccc_backup.dump"
```

### Export duke database

```powershell
pg_dump -h localhost -U postgres -p 5432 -d pos_database_duke -F c -b -v -f "C:\ccc\db_backups\duke_backup.dump"
```

**Alternative: Use plain SQL format**

```powershell
pg_dump -h localhost -U postgres -p 5432 -d database > C:\ccc\db_backups\ccc_backup.sql
pg_dump -h localhost -U postgres -p 5432 -d pos_database_duke > C:\ccc\db_backups\duke_backup.sql
```

---

## Step 2: Test RDS Connection

```powershell
# Set RDS password
$env:PGPASSWORD = "Tmabdulmalik$51"

# Test connection
psql -h pos-ccc-db-prod.cromc6kag7po.eu-north-1.rds.amazonaws.com -U postgres -p 5432 -d postgres -c "SELECT version();"
```

**Expected Output:**

```
PostgreSQL 14.x on x86_64-pc-linux-gnu, compiled by gcc ...
```

**If connection fails:**

1. Check AWS Console → EC2 → Security Groups → sg-07132512f16590f0c
2. Add Inbound Rule:
   - Type: PostgreSQL
   - Protocol: TCP
   - Port: 5432
   - Source: My IP (or 0.0.0.0/0 temporarily)

---

## Step 3: Create Databases in RDS

```powershell
# Set RDS password
$env:PGPASSWORD = "Tmabdulmalik$51"

# The 'ccc' database should already exist (created during RDS setup)
# If not, create it:
psql -h pos-ccc-db-prod.cromc6kag7po.eu-north-1.rds.amazonaws.com -U postgres -p 5432 -d postgres -c "CREATE DATABASE ccc;"

# Create duke database
psql -h pos-ccc-db-prod.cromc6kag7po.eu-north-1.rds.amazonaws.com -U postgres -p 5432 -d postgres -c "CREATE DATABASE pos_database_duke;"

# Verify databases were created
psql -h pos-ccc-db-prod.cromc6kag7po.eu-north-1.rds.amazonaws.com -U postgres -p 5432 -d postgres -c "\l"
```

---

## Step 4: Import Data to RDS

### Import using custom format (.dump)

```powershell
# Import ccc database
pg_restore -h pos-ccc-db-prod.cromc6kag7po.eu-north-1.rds.amazonaws.com -U postgres -p 5432 -d ccc -v "C:\ccc\db_backups\ccc_backup.dump"

# Import duke database
pg_restore -h pos-ccc-db-prod.cromc6kag7po.eu-north-1.rds.amazonaws.com -U postgres -p 5432 -d pos_database_duke -v "C:\ccc\db_backups\duke_backup.dump"
```

### Import using SQL format (.sql) - Alternative

```powershell
# Import ccc database
psql -h pos-ccc-db-prod.cromc6kag7po.eu-north-1.rds.amazonaws.com -U postgres -p 5432 -d ccc < C:\ccc\db_backups\ccc_backup.sql

# Import duke database
psql -h pos-ccc-db-prod.cromc6kag7po.eu-north-1.rds.amazonaws.com -U postgres -p 5432 -d pos_database_duke < C:\ccc\db_backups\duke_backup.sql
```

**Note:** You may see some warnings about roles or permissions - this is normal.

---

## Step 5: Verify Migration

```powershell
$env:PGPASSWORD = "Tmabdulmalik$51"

# Check tables in ccc database
psql -h pos-ccc-db-prod.cromc6kag7po.eu-north-1.rds.amazonaws.com -U postgres -p 5432 -d ccc -c "\dt"

# Count rows in a sample table (adjust table name)
psql -h pos-ccc-db-prod.cromc6kag7po.eu-north-1.rds.amazonaws.com -U postgres -p 5432 -d ccc -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public';"

# Check tables in duke database
psql -h pos-ccc-db-prod.cromc6kag7po.eu-north-1.rds.amazonaws.com -U postgres -p 5432 -d pos_database_duke -c "\dt"
```

---

## Step 6: Update Application Configuration

The `.env` file has already been updated with:

```
DB_HOST="pos-ccc-db-prod.cromc6kag7po.eu-north-1.rds.amazonaws.com"
DB_NAME="ccc"
DB_DUKE_HOST="pos-ccc-db-prod.cromc6kag7po.eu-north-1.rds.amazonaws.com"
DB_DUKE_NAME="pos_database_duke"
```

---

## Step 7: Test Application

```powershell
# Stop current backend if running
# Restart backend
cd C:\ccc\Server
npm start
```

**Check logs for:**

- ✓ "Connected to the ccc database"
- ✓ "Connected to the duke database"

---

## Troubleshooting

### Error: "Connection refused"

**Solution:** Check security group allows your IP on port 5432

### Error: "password authentication failed"

**Solution:** Verify password in .env matches RDS master password

### Error: "database does not exist"

**Solution:** Run CREATE DATABASE commands in Step 3

### Error: "pg_dump: command not found"

**Solution:** Install PostgreSQL client tools:

```powershell
# Download from: https://www.postgresql.org/download/windows/
# Or use chocolatey:
choco install postgresql
```

### Error: "SSL connection required"

**Solution:** This is already handled in your db.js and dbDuke.js files

---

## Quick Commands Reference

```powershell
# Set password (run before each psql/pg_dump command)
$env:PGPASSWORD = "Tmabdulmalik$51"

# Connect to RDS
psql -h pos-ccc-db-prod.cromc6kag7po.eu-north-1.rds.amazonaws.com -U postgres -d ccc

# List databases
psql -h pos-ccc-db-prod.cromc6kag7po.eu-north-1.rds.amazonaws.com -U postgres -d postgres -c "\l"

# List tables
psql -h pos-ccc-db-prod.cromc6kag7po.eu-north-1.rds.amazonaws.com -U postgres -d ccc -c "\dt"

# Run SQL query
psql -h pos-ccc-db-prod.cromc6kag7po.eu-north-1.rds.amazonaws.com -U postgres -d ccc -c "SELECT NOW();"
```

---

## Security Best Practices (After Migration)

1. **Restrict Security Group:**

   ```
   Remove: 0.0.0.0/0
   Add: Your EC2 instance security group only
   ```

2. **Change to Private Access:**

   - AWS Console → RDS → Modify → Public accessibility → No

3. **Enable Encryption:**

   - Already enabled during RDS creation

4. **Regular Backups:**
   - AWS handles automatic backups (7 days retention)
   - Manual snapshots before major changes

---

## Success Checklist

- [ ] Databases exported successfully
- [ ] RDS connection tested
- [ ] Databases created in RDS
- [ ] Data imported to RDS
- [ ] Tables verified in both databases
- [ ] Application connects to RDS
- [ ] Application works correctly
- [ ] Security group restricted
- [ ] Backup of old data kept

---

## Support

If you encounter issues:

1. Check AWS CloudWatch Logs for RDS
2. Check application logs: `pm2 logs` or check terminal output
3. Verify .env file has correct values
4. Test connection manually with psql
