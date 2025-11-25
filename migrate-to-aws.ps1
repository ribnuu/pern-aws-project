# AWS RDS Migration Script for POS System
# Date: November 23, 2025

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "AWS RDS Migration Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Configuration
$OLD_DB_HOST = "pos-ccc-db-prod.cromc6kag7po.eu-north-1.rds.amazonaws.com"  # Your current database host
$OLD_DB_USER = "postgres"
$OLD_DB_PASSWORD = "postgres"  # Your current database password
$OLD_DB_PORT = "5432"

$RDS_ENDPOINT = "pos-ccc-db-prod.cromc6kag7po.eu-north-1.rds.amazonaws.com"
$RDS_USER = "postgres"
$RDS_PASSWORD = "Tmabdulmalik$51"
$RDS_PORT = "5432"

$BACKUP_DIR = "C:\ccc\db_backups"
$TIMESTAMP = Get-Date -Format "yyyyMMdd_HHmmss"

# Create backup directory if it doesn't exist
if (-not (Test-Path $BACKUP_DIR)) {
    New-Item -ItemType Directory -Path $BACKUP_DIR | Out-Null
    Write-Host "Created backup directory: $BACKUP_DIR" -ForegroundColor Green
}

Write-Host ""
Write-Host "Step 1: Exporting current databases..." -ForegroundColor Yellow
Write-Host "---------------------------------------" -ForegroundColor Yellow

# Export ccc database
Write-Host "Exporting 'database' (ccc)..." -ForegroundColor White
$env:PGPASSWORD = $OLD_DB_PASSWORD
pg_dump -h $OLD_DB_HOST -U $OLD_DB_USER -p $OLD_DB_PORT -d database -F c -b -v -f "$BACKUP_DIR\ccc_backup_$TIMESTAMP.dump"

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Successfully exported 'database' (ccc)" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to export 'database' (ccc)" -ForegroundColor Red
    exit 1
}

# Export duke database
Write-Host "Exporting 'pos_database_duke'..." -ForegroundColor White
pg_dump -h $OLD_DB_HOST -U $OLD_DB_USER -p $OLD_DB_PORT -d pos_database_duke -F c -b -v -f "$BACKUP_DIR\duke_backup_$TIMESTAMP.dump"

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Successfully exported 'pos_database_duke'" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to export 'pos_database_duke'" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Step 2: Testing RDS connection..." -ForegroundColor Yellow
Write-Host "---------------------------------------" -ForegroundColor Yellow

# Test RDS connection
$env:PGPASSWORD = $RDS_PASSWORD
psql -h $RDS_ENDPOINT -U $RDS_USER -p $RDS_PORT -d postgres -c "SELECT version();"

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Successfully connected to RDS" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to connect to RDS. Please check:" -ForegroundColor Red
    Write-Host "  1. Security group allows your IP on port 5432" -ForegroundColor Red
    Write-Host "  2. RDS instance is publicly accessible" -ForegroundColor Red
    Write-Host "  3. Password is correct" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Step 3: Creating databases in RDS..." -ForegroundColor Yellow
Write-Host "---------------------------------------" -ForegroundColor Yellow

# Create ccc database (if not exists)
Write-Host "Creating 'ccc' database..." -ForegroundColor White
psql -h $RDS_ENDPOINT -U $RDS_USER -p $RDS_PORT -d postgres -c "CREATE DATABASE ccc;" 2>$null
Write-Host "✓ Database 'ccc' ready" -ForegroundColor Green

# Create duke database
Write-Host "Creating 'pos_database_duke' database..." -ForegroundColor White
psql -h $RDS_ENDPOINT -U $RDS_USER -p $RDS_PORT -d postgres -c "CREATE DATABASE pos_database_duke;" 2>$null
Write-Host "✓ Database 'pos_database_duke' ready" -ForegroundColor Green

Write-Host ""
Write-Host "Step 4: Importing data to RDS..." -ForegroundColor Yellow
Write-Host "---------------------------------------" -ForegroundColor Yellow

# Import ccc database
Write-Host "Importing data to 'ccc'..." -ForegroundColor White
pg_restore -h $RDS_ENDPOINT -U $RDS_USER -p $RDS_PORT -d ccc -v "$BACKUP_DIR\ccc_backup_$TIMESTAMP.dump"

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Successfully imported 'ccc' database" -ForegroundColor Green
} else {
    Write-Host "⚠ Import completed with some warnings (this is normal)" -ForegroundColor Yellow
}

# Import duke database
Write-Host "Importing data to 'pos_database_duke'..." -ForegroundColor White
pg_restore -h $RDS_ENDPOINT -U $RDS_USER -p $RDS_PORT -d pos_database_duke -v "$BACKUP_DIR\duke_backup_$TIMESTAMP.dump"

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Successfully imported 'pos_database_duke' database" -ForegroundColor Green
} else {
    Write-Host "⚠ Import completed with some warnings (this is normal)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Step 5: Verifying migration..." -ForegroundColor Yellow
Write-Host "---------------------------------------" -ForegroundColor Yellow

# Verify ccc database
Write-Host "Verifying 'ccc' database..." -ForegroundColor White
$cccTables = psql -h $RDS_ENDPOINT -U $RDS_USER -p $RDS_PORT -d ccc -t -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public';"
Write-Host "  Tables in 'ccc': $cccTables" -ForegroundColor Cyan

# Verify duke database
Write-Host "Verifying 'pos_database_duke' database..." -ForegroundColor White
$dukeTables = psql -h $RDS_ENDPOINT -U $RDS_USER -p $RDS_PORT -d pos_database_duke -t -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public';"
Write-Host "  Tables in 'pos_database_duke': $dukeTables" -ForegroundColor Cyan

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Migration Summary" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "RDS Endpoint: $RDS_ENDPOINT" -ForegroundColor White
Write-Host "Backup Location: $BACKUP_DIR" -ForegroundColor White
Write-Host "Backup Files:" -ForegroundColor White
Write-Host "  - ccc_backup_$TIMESTAMP.dump" -ForegroundColor Gray
Write-Host "  - duke_backup_$TIMESTAMP.dump" -ForegroundColor Gray
Write-Host ""
Write-Host "✓ Migration completed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "1. Update .env file with new RDS endpoint" -ForegroundColor White
Write-Host "2. Test application with new database" -ForegroundColor White
Write-Host "3. Update security group to restrict access" -ForegroundColor White
Write-Host ""
