# How to Create Admin Users

## Method 1: Auto-Admin Registration (Currently Active)

The registration system now automatically creates admin users if the email contains "admin".

### Steps:
1. Go to the registration page
2. Register with an email like:
   - `admin@example.com`
   - `myadmin@gmail.com`
   - `admin.user@company.com`
3. The system will automatically assign "admin" role
4. You'll be redirected to the admin dashboard

### Example Admin Emails:
- ✅ `admin@cozastore.com` → Admin
- ✅ `admin123@gmail.com` → Admin
- ✅ `myadmin@test.com` → Admin
- ❌ `user@example.com` → Customer

---

## Method 2: Manual Database Update (Firebase Console)

### Steps:
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Navigate to **Firestore Database**
4. Find the `users` collection
5. Select the user document you want to make admin
6. Edit the `role` field
7. Change value from `customer` to `admin`
8. Save changes

---

## Method 3: Update via Code (For Existing Users)

Create a temporary script to update existing users:

```typescript
// Run this in browser console while logged in
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

async function makeUserAdmin(userId: string) {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      role: "admin"
    });
    console.log("User updated to admin!");
  } catch (error) {
    console.error("Error:", error);
  }
}

// Usage: Replace with your user ID
makeUserAdmin("YOUR_USER_ID_HERE");
```

---

## Method 4: Add Role Selector to Registration (Development)

Add a role selector field to the registration form:

```tsx
{/* Add to registration form */}
<div>
  <label>Account Type</label>
  <select value={role} onChange={(e) => setRole(e.target.value)}>
    <option value="customer">Customer</option>
    <option value="admin">Administrator</option>
  </select>
</div>
```

**⚠️ Important**: Remove role selector before production! Only allow admin creation through secure backend methods.

---

## Security Recommendations

### For Production:
1. **Remove the auto-admin email check** from registration
2. **Create admin users only via**:
   - Firebase Admin SDK (server-side)
   - Firebase Console manually
   - Secure admin management dashboard
3. **Never allow client-side role assignment**

### Current Setup (Development):
✅ Quick admin creation for testing
⚠️ Must be changed before production deployment

---

## Testing Admin Features

After creating an admin account:

1. **Login** with admin credentials
2. You'll be redirected to `/dashboard` (admin panel)
3. **Test Features**:
   - View dashboard stats
   - Access admin-only pages
   - Manage users (when implemented)
   - View all orders (when implemented)

Regular customers will be redirected to `/` (homepage) instead.
