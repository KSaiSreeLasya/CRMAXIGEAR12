# Spare Inventory Import/Export Guide

## Overview

The Spare Inventory module now includes comprehensive import and export functionality, allowing you to:
- **Import spares** from CSV or Excel files
- **Export spares** to CSV format for data backup and sharing
- **Export spares** to Excel format for detailed reporting
- **Export spares** to PDF format for printing and documentation

## Location

Navigate to **Inventory > Spares Inventory tab** to access the Import/Export features.

## Import Functionality

### Supported Formats
- **CSV** (.csv files)
- **Excel** (.xlsx, .xls files)

### CSV Template Structure

Your import file must have the following columns (case-insensitive):
```
Part Name,Price,Quantity
```

### Example CSV File

```csv
"Part Name","Price","Quantity"
"Brake Pad Set",450.00,10
"Oil Filter",250.00,15
"Air Filter",300.00,8
"Spark Plug",150.00,20
"Battery 60V 30AH",8500.00,5
```

### Import Steps

1. Go to **Inventory > Spares Inventory** tab
2. Click the **"Import CSV/Excel"** button
3. Select a CSV or Excel file from your computer
4. The system will validate the data and import valid records
5. Success message will show how many spares were imported

### Validation Rules

- **Part Name** is required (cannot be empty)
- **Price** must be a valid positive number (≥ 0)
- **Quantity** must be a valid positive integer (≥ 0)
- Each row must have at least these three columns

### Error Handling

If import fails, you'll see an error message indicating:
- Which row has the problem
- What validation rule was violated
- How to fix it

### Data Storage

Imported spares are:
- Saved to Supabase `spares_inventory` table (if available)
- Automatically backed up to browser's localStorage
- Immediately available in the spares list

## Export Functionality

### Export to CSV

1. Click **"Export CSV"** button in the Spares Inventory section
2. A file named `spares_inventory.csv` will download
3. This file can be opened in Excel, Google Sheets, or any text editor
4. Use this for data backup or importing into other systems

### Export to Excel

1. Click **"Export Excel"** button
2. A file named `spares_inventory.xlsx` will download
3. Opens directly in Microsoft Excel or Google Sheets
4. Includes UTF-8 encoding for proper character support
5. Formatted for easy readability and further analysis

### Export to PDF

1. Click **"Export PDF"** button
2. A file named `spares_inventory.pdf` will download
3. Includes:
   - Professional report layout with header
   - Formatted table with all spare details
   - **Total Inventory Value** calculation at the bottom
   - Print-ready format
4. Perfect for printing, sharing with stakeholders, or archival

### What Gets Exported

All exports include:
- **Part Name**: Name of the spare part
- **Price**: Unit price in rupees (₹)
- **Quantity**: Current available quantity
- **Total**: Total inventory value (Price × Quantity)
- **Created At**: Date when the spare was added

## Use Cases

### 1. Backup and Recovery
Export regularly to maintain backups of your inventory data:
```
Weekly: Export CSV every Friday
Monthly: Export PDF for records
```

### 2. Multi-Location Inventory
- Export from one location in CSV format
- Import into another location's system
- Keeps distributed inventory synchronized

### 3. Supplier Management
- Export inventory list in Excel format
- Share with suppliers to request stock
- Track pricing changes over time

### 4. Reporting
- Export PDF monthly for management reports
- Use Excel export for data analysis
- Monitor inventory trends and values

### 5. System Migration
- Export current spares in CSV
- Use it for migration to other systems
- Data is structured for easy integration

## Technical Details

### File Encoding
- CSV files use UTF-8 with BOM (Byte Order Mark) for Excel compatibility
- Handles special characters (₹, ñ, etc.) properly
- Works across different operating systems (Windows, Mac, Linux)

### Data Format
- Numbers are properly formatted with 2 decimal places for prices
- Quantities are shown as whole numbers
- Dates are formatted as MM/DD/YYYY

### Limitations
- Maximum file size: Browser's file input limit (typically several MB)
- Import processes files synchronously
- Export creates files in your downloads folder

## Troubleshooting

### Import fails with "CSV file must contain headers"
- Ensure first row contains: `Part Name,Price,Quantity`
- Check for proper comma separation
- Verify file is not corrupted

### Import fails with "Invalid Price/Quantity"
- Price must be a decimal number (e.g., 450.00, 100, 50.5)
- Quantity must be a whole number (e.g., 10, 15, 20)
- No negative numbers allowed
- Remove any currency symbols (₹)

### Export buttons are disabled
- No spares in inventory yet
- Add at least one spare item first
- Export buttons activate when data is available

### PDF export looks different
- PDF uses standard fonts for compatibility
- Colors may appear different when printed
- Use browser's print preview for better control

## Best Practices

1. **Regular Backups**: Export CSV weekly for backup
2. **Validation**: Always review imported data before large imports
3. **Naming**: Use clear, consistent part names for easier searching
4. **Pricing**: Keep prices updated for accurate inventory valuation
5. **Documentation**: Save exported PDFs for audit trails

## Support

For issues or questions:
1. Check error messages for specific guidance
2. Verify file format matches the CSV template
3. Ensure data validation rules are met
4. Contact support if problems persist
