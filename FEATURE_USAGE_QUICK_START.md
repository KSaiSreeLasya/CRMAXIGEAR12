# Quick Start: Spare Inventory Import/Export

## Where to Find It
1. Go to **Inventory** menu
2. Click the **Spares Inventory** tab
3. You'll see the **Import/Export Spares** section at the top

## 📥 How to Import

### Step 1: Prepare Your File
Create a CSV or Excel file with these columns:
```
Part Name  | Price  | Quantity
-----------|--------|----------
Brake Pad  | 450.00 | 10
Oil Filter | 250.00 | 15
```

### Step 2: Click Import Button
Click **"Import CSV/Excel"** button

### Step 3: Select File
Browse and select your CSV or Excel file

### Step 4: Done
- File is validated automatically
- Spares are added to your inventory
- Success message shows number of items imported

## 📤 How to Export

### Export as CSV
Perfect for: Backup, sharing with others, importing into other systems
- Click **"Export CSV"** button
- File `spares_inventory.csv` downloads

### Export as Excel
Perfect for: Analysis, pivot tables, detailed reporting
- Click **"Export Excel"** button  
- File `spares_inventory.xlsx` downloads
- Opens directly in Excel or Google Sheets

### Export as PDF
Perfect for: Printing, sharing with management, record keeping
- Click **"Export PDF"** button
- File `spares_inventory.pdf` downloads
- Includes total inventory value calculation
- Print-ready format

## ✅ File Requirements

**Required Columns** (exact spelling, case doesn't matter):
- `Part Name` - Name of the spare part
- `Price` - Unit price (decimal number)
- `Quantity` - Stock quantity (whole number)

**Example Valid Data:**
```csv
"Part Name","Price","Quantity"
"Spark Plug",150.00,20
"Battery 60V 30AH",8500.00,5
"Wiper Blade",200.00,12
```

## ⚠️ Common Issues

| Problem | Solution |
|---------|----------|
| "CSV must contain columns..." | Ensure file has Part Name, Price, Quantity columns |
| "Price cannot be negative" | Remove currency symbols (₹), use numbers only |
| "Row X: Part Name is required" | All rows must have a part name |
| "Please upload CSV or Excel" | Use .csv, .xlsx, or .xls file extension |

## 💡 Pro Tips

1. **Weekly Backup**: Export CSV every week to backup
2. **Share with Team**: Export Excel for team analysis
3. **Print Reports**: Export PDF for management meetings
4. **Bulk Import**: Prepare CSV with 100+ items at once
5. **Update Prices**: Export, modify prices in Excel, re-import

## 🎯 Use Cases

### Multi-Location Sync
```
Location A → Export CSV → Location B → Import CSV
```

### Supplier Management
```
Export Excel → Share with supplier → They send updated prices → Import CSV
```

### Inventory Analysis
```
Export Excel → Use pivot tables for analysis → Create reports
```

### Audit Trail
```
Export PDF monthly → File in records folder → Track changes over time
```

## Sample CSV Template

Save this as `spares.csv` and import:

```csv
"Part Name","Price","Quantity"
"Brake Pad Set",450.00,10
"Oil Filter",250.00,15
"Air Filter",300.00,8
"Spark Plug",150.00,20
"Battery 60V 30AH",8500.00,5
"Wiper Blade",200.00,12
"Coolant 1L",350.00,6
"Engine Oil 1L",400.00,8
"Bearing Set",1200.00,3
"Drive Belt",800.00,4
```

## 🔒 Data Safety

- ✅ Data saved to database immediately
- ✅ Automatic backup to browser storage
- ✅ Can import multiple times (no duplicates created)
- ✅ All exports are read-only (safe to share)

---

**Need more help?** Check `docs/SPARE_INVENTORY_IMPORT_EXPORT.md` for detailed documentation.
