# Creating an Admin User

## Steps:

### 1. Sign up through the application
Visit: http://localhost:3000/sign-up and create an account

### 2. Update user role in MongoDB

After signing up, connect to MongoDB and run:

```javascript
// Connect to MongoDB
mongosh mongodb://localhost:27017/wiroot_db

// Update the user role to ADMIN
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "ADMIN" } }
)
```

Replace `your-email@example.com` with the email you used to sign up.

### 3. Access Admin Dashboard

After updating the role, visit: http://localhost:3000/admin

You'll now have access to:
- Vendor Management
- Product Management  
- Order Management

## Notes:
- By default, all new users have the role `CUSTOMER`
- Only users with role `ADMIN` can access the admin dashboard
- The admin role gives full access to vendor, product, and order management
