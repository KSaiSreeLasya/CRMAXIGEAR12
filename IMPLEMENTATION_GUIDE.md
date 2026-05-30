# Mode of Payment and Lead Source Implementation Guide

## Summary of Changes

This implementation adds two new fields to the sales management system:
1. **Mode of Payment** (Cash, Card, UPI) - for tracking payment methods
2. **Lead Source** - for tracking where the customer/lead came from

### Updated Components

#### 1. Database Schema (`ADD_PAYMENT_AND_LEAD_SOURCE.sql`)
- Added `mode_of_payment` column to: `estimations`, `projects`, `service_invoices`, `invoices`
- Added `lead_source` column to: `estimations`, `projects`, `service_invoices`, `invoices`
- Created optional `lead_sources` lookup table for common lead source values
- Added indexes for performance optimization
- Implemented RLS policies for security

#### 2. Frontend Components

**client/pages/Projects.tsx**
- Updated `EstimationRecord` interface with `modeOfPayment` and `leadSource` fields
- Updated `Project` interface with `modeOfPayment` and `leadSource` fields
- Modified `loadProjects()` and `loadEstimations()` to load new fields from database
- Updated `handleSaveEstimation()` to save new fields to database and localStorage
- Updated `handleEditEstimation()` to load new fields when editing
- Added form inputs for Mode of Payment (select) and Lead Source (text)
- Added table columns to display these fields in the estimations table
- Updated `handleCreateProject()` to save new fields
- Updated `handleUpdateProject()` to update new fields

**client/components/CreateProjectModal.tsx**
- Added `modeOfPayment` and `leadSource` to form state (default: "Cash" and "")
- Added Mode of Payment dropdown (Cash, Card, UPI)
- Added Lead Source text input
- Updated form submission to include new fields in payload
- Updated form reset to initialize new fields

**client/components/EditProjectModal.tsx**
- Added `modeOfPayment` and `leadSource` to form state
- Updated useEffect to populate new fields when editing
- Updated handleChange to support select elements
- Added Mode of Payment dropdown (Cash, Card, UPI)
- Added Lead Source text input
- Updated form submission to include new fields in payload

### Default Values
- **Mode of Payment**: "Cash" (default)
- **Lead Source**: "" (empty string, optional)

### Field Types
- **Mode of Payment**: ENUM (Cash, Card, UPI)
- **Lead Source**: TEXT (free-form text, max 255 characters recommended)

### Tables Updated
1. `estimations` - Sales pipeline estimations
2. `projects` - Projects/sales records
3. `service_invoices` - Service invoices (if exists)
4. `invoices` - General invoices (if exists)

### Optional: Lead Sources Lookup Table
Pre-populated common values:
- Direct Walk-in
- Phone Inquiry
- Website
- Social Media
- Referral
- Dealer
- Advertisement
- Trade Show
- Email
- Other

## Deployment Steps

1. **Run SQL Migration**
   - Go to Supabase Dashboard → SQL Editor
   - Copy and paste the contents of `ADD_PAYMENT_AND_LEAD_SOURCE.sql`
   - Execute the query

2. **Deploy Frontend Changes**
   - The code changes are already implemented
   - Push to your repository
   - Deploy to your hosting (Netlify/Vercel)

3. **Test the Features**
   - Create a new project/estimation
   - Verify Mode of Payment dropdown appears
   - Verify Lead Source input appears
   - Edit an existing record to verify fields save and load correctly
   - Check the estimations table for new columns

## Database Schema Reference

### estimations table
```sql
ALTER TABLE estimations
ADD COLUMN mode_of_payment TEXT DEFAULT 'Cash' CHECK (mode_of_payment IN ('Cash', 'Card', 'UPI')),
ADD COLUMN lead_source TEXT;
```

### projects table
```sql
ALTER TABLE projects
ADD COLUMN mode_of_payment TEXT DEFAULT 'Cash' CHECK (mode_of_payment IN ('Cash', 'Card', 'UPI')),
ADD COLUMN lead_source TEXT;
```

### service_invoices table
```sql
ALTER TABLE service_invoices
ADD COLUMN mode_of_payment TEXT DEFAULT 'Cash' CHECK (mode_of_payment IN ('Cash', 'Card', 'UPI')),
ADD COLUMN lead_source TEXT;
```

## Field Mapping

### Projects Form Fields (Updated)
- Model No.
- Customer Name *
- Contact No *
- Location
- Product Description *
- HSN No.
- Chassis No.
- Motor No.
- Battery No.
- Battery Warranty
- Battery Capacity *
- Vehicle Warranty
- Invoice Date *
- Amount *
- **Mode of Payment** (NEW) - Dropdown: Cash, Card, UPI
- **Lead Source** (NEW) - Text input

### Estimations Form Fields (Updated)
- Estimation Slip No.
- Customer Name
- Contact No.
- Estimation Date
- Model
- Amount *
- **Mode of Payment** (NEW) - Dropdown: Cash, Card, UPI
- **Lead Source** (NEW) - Text input

### Estimations Table Columns (Updated)
- Slip No
- Customer
- Contact
- Date
- Model
- Amount
- **Payment Mode** (NEW)
- **Lead Source** (NEW)
- Action

## Notes
- Mode of Payment has default value "Cash" for backward compatibility
- Lead Source is optional (can be left empty)
- Both fields are included in edit operations
- localStorage fallback included for offline functionality
- All new fields are properly validated and typed in TypeScript
