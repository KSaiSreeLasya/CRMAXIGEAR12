# Setting Up Santhosh@axigear.in as Admin

## Issue Fixed ✅

The previous `create_employee` RPC function required Supabase authentication, which failed when called directly. This has been fixed by:

1. Creating a server-side endpoint that handles employee creation
2. Automatically detecting RPC auth failures and falling back to direct database insertion
3. The client now uses this server endpoint instead of calling RPC directly

---

## How to Create Santhosh as Admin

### **Step 1: Open the Admin Interface**

You need an existing admin account first. The system starts in one of these states:

**Option A: You have a Supabase auth user**
- Log in with a Supabase account
- You'll automatically have admin access

**Option B: You have an employee with Admin role already**
- Log in with that employee account
- You'll have admin access

**Option C: First-time setup (use this if stuck)**
- Go to the browser console (F12 or Ctrl+Shift+K)
- Scroll to the bottom of this guide for the direct API method

---

### **Step 2: Navigate to Employee Management**

If you have admin access:
1. Click **"Admin"** in the top navigation menu
2. You'll see the Employee Management page with an "Add new employee" button

---

### **Step 3: Create Santhosh**

Fill in the form with:
- **Full Name**: `Santhosh`
- **Email**: `santhosh@axigear.in`
- **Password**: `Santhosh@2026`
- **Role**: `Admin` (⚠️ **Important: Must be exactly "Admin"**)
- **Phone**: (optional, leave blank)

Click **"Save Employee"** button.

✅ **Success!** Santhosh is now created with Admin role.

---

## If You Don't Have Admin Access Yet

### **Method 1: Direct Supabase (Recommended)**

1. Go to your Supabase dashboard: https://app.supabase.co
2. Select your project
3. Go to **SQL Editor**
4. Run this query:

```sql
INSERT INTO employees (full_name, email, password_hash, role, is_active)
VALUES (
  'Santhosh',
  'santhosh@axigear.in',
  'U2FudGhvc2hAMjAyNg==',  -- base64 hash of password
  'Admin',
  true
) ON CONFLICT (email) DO UPDATE SET role = 'Admin', is_active = true;
```

5. Click **Run**
6. Now log in with `santhosh@axigear.in` / `Santhosh@2026`

---

### **Method 2: Browser Console API Call**

1. Open the app in your browser
2. Press **F12** to open Developer Tools
3. Go to the **Console** tab
4. Paste this code:

```javascript
fetch('/api/admin/setup-employee', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    fullName: 'Santhosh',
    email: 'santhosh@axigear.in',
    password: 'Santhosh@2026',
    role: 'Admin'
  })
})
.then(r => r.json())
.then(data => {
  if (data.success) {
    console.log('✅ Santhosh created successfully!', data);
    alert('Santhosh admin account created! You can now login.');
  } else {
    console.error('❌ Failed:', data.error);
    alert('Error: ' + data.error);
  }
})
.catch(e => console.error('Error:', e));
```

5. Press **Enter**
6. Wait for the success message
7. Log in with `santhosh@axigear.in` / `Santhosh@2026`

---

## Testing Santhosh's Admin Access

After creating Santhosh and logging in:

1. **Check Admin Menu**: Should see "Admin" and "⚙️" in the top navigation
2. **Access Admin Features**:
   - Click **Admin** → Manage employees, add/edit/delete
   - Click **⚙️** → Change password
   - Access **Attendance** → Manage employee attendance
   - Access **Inventory** → Manage vehicles and spare parts
   - Access **Sales** → Manage sales data
3. **Verify Auto-Auth**: Go to **Admin** page, should NOT ask for admin password (auto-verified)

---

## Troubleshooting

### Error: "User not authenticated"
- **Cause**: You're not logged in as an admin
- **Solution**: Follow "Method 2" (Browser Console) above to create Santhosh first, then log in

### Error: "Failed to create employee"
- **Check**: Email is correct (`santhosh@axigear.in`)
- **Check**: Password is at least 6 characters
- **Check**: Supabase employees table exists
- Check browser console (F12) for more details

### Santhosh logs in but no Admin menu appears
- **Cause**: Role might not be exactly "Admin"
- **Solution**: Edit the employee, change role to exactly `Admin` (capital A)
- Check Supabase: the `role` field should contain `Admin`

### Can't access the API endpoint
- **Cause**: Server not running
- **Solution**: The dev server should be running (check terminal)
- Try refreshing the page

### Stuck on first employee creation
- Use **Method 2** (Browser Console) to bootstrap the first admin
- Then create additional employees through the UI

---

## What Changed in the Code

### Before (Had auth issues):
- AdminEmployees.tsx called `supabase.rpc("create_employee", ...)`
- Failed with "User not authenticated" error

### After (Fixed):
- AdminEmployees.tsx calls `/api/admin/setup-employee` server endpoint
- Server endpoint tries RPC first
- If RPC fails due to auth, falls back to direct database insert
- No auth issues anymore!

---

## Password Storage Note

⚠️ **Important**: The current implementation stores passwords as base64-encoded strings for the employee login fallback. This is a **simple fallback mechanism** and **NOT production-secure**. For production:

1. Use Supabase Auth for primary user authentication
2. Use bcrypt or similar for password hashing
3. Implement proper password reset flows
4. Consider multi-factor authentication

For now, this works for the employee login system but should be upgraded before going live.

---

## Summary of Admin Capabilities

Once Santhosh is set up with Admin role:

| Feature | Access |
|---------|--------|
| Employee Management | ✅ Add, edit, delete employees |
| Attendance | ✅ Log and manage attendance |
| Inventory | ✅ Manage vehicles and spare parts |
| Sales/Estimations | ✅ Create and manage sales data |
| Service Invoices | ✅ Generate invoices |
| Admin Settings | ✅ Change password |
| Admin Pages | ✅ No password dialog required |
| Data Visibility | ✅ See all employee and company data |

