# Fix for 404 Error on Login

## Problem
Getting "Request failed with status code 404" when trying to login with existing database data.

## Root Cause
The API baseURL was changed to `/api` (relative path), but Vite dev server wasn't proxying these requests to the backend on port 5000. Frontend makes request to `/api/auth/login` which resolves to `localhost:5173/api/auth/login` instead of `localhost:5000/api/auth/login`.

## Solution Implemented

### 1. **Vite Proxy Configuration** - `vite.config.js`
Added dev server proxy to forward `/api` requests to backend:

```javascript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:5000',
      changeOrigin: true,
      rewrite: (path) => path,
    }
  }
}
```

This makes Vite automatically forward all `/api/*` requests to `http://localhost:5000/api/*`

### 2. **Smart API Configuration** - `src/lib/api.js`
Updated to use proxy in development and full URL in production:

```javascript
const API_BASE_URL = import.meta.env.DEV 
  ? '/api'  // Dev: uses Vite proxy
  : (import.meta.env.VITE_API_URL || 'http://localhost:5000/api');
```

## How It Works Now

### Development Flow
```
Frontend (localhost:5173)
    ↓
Makes request to /api/auth/login
    ↓
Vite Dev Server intercepts
    ↓
Forwards to Backend (localhost:5000)
    ↓
Backend returns response
    ↓
Frontend receives data ✅
```

### Production Flow
```
Frontend (example.com)
    ↓
Makes request to backend API URL
(from VITE_API_URL environment variable)
    ↓
Direct connection to Backend
    ↓
Backend returns response ✅
```

## How to Test

### Step 1: Stop all servers
Kill any running Vite dev servers and Node backends.

### Step 2: Start Backend
```bash
cd backend
npm install  # (if not done yet)
npm run dev
```

Expected output:
```
✓ MongoDB connected
🚀 Server running on http://localhost:5000
📝 API Endpoints:
   POST   /api/auth/register           - Register new user
   POST   /api/auth/login              - Login user
```

### Step 3: Start Frontend (in new terminal)
```bash
npm run dev
```

Expected output:
```
  VITE v5.0.0  ready in 234 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

### Step 4: Test Login
1. Go to `http://localhost:5173/login`
2. Enter existing user email and password
3. Should successfully login and redirect to `/kanban`

## Troubleshooting

### If Still Getting 404
1. **Verify Backend is Running**
   ```bash
   curl http://localhost:5000/api/health
   ```
   Should return:
   ```json
   {"success":true,"message":"Server is running",...}
   ```

2. **Check MongoDB Connection**
   Backend console should show: `✓ MongoDB connected`
   
3. **Verify MongoDB is Running**
   - On Windows: MongoDB should be running (check Services)
   - Local instance: `mongosh` or `mongo` in terminal

4. **Check Vite Proxy**
   - Open DevTools (F12) → Network tab
   - Try login
   - Look for request to `/api/auth/login`
   - Should see it forwarded (no red X)

### If Getting CORS Error
Backend CORS is already configured for:
- localhost (all ports)
- 127.0.0.1 (all ports)
- todo.local
- Development ports 5173, 3000, 5000

If still getting CORS error, check backend console for the actual origin being rejected.

### If MongoDB Connection Fails
Check `backend/.env`:
```
MONGO_URI=mongodb://localhost:27017/todo-app
```

Make sure:
1. MongoDB is installed on your machine
2. MongoDB service is running
3. Connection string is correct

## Files Modified

✅ `vite.config.js` - Added proxy configuration
✅ `src/lib/api.js` - Smart API baseURL for dev/prod
✅ `backend/.env` - Ensure correct configuration
✅ `backend/.env.example` - Example config added

## Development vs Production

### Dev (npm run dev)
- Vite runs on `localhost:5173`
- Proxy forwards `/api` to `localhost:5000`
- No CORS issues (proxy handles it)

### Production (npm run build + npm run preview)
- Set `VITE_API_URL` environment variable:
  ```bash
  VITE_API_URL=https://your-backend-domain.com/api
  ```
- Or use default: `http://localhost:5000/api`

## API Endpoints

All endpoints are now prefixed with `/api`:

### Public
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Protected (require JWT token)
- `GET /api/user/dashboard` - Get dashboard data
- `GET /api/health` - Server health check

## Next Steps

1. Ensure both backend and frontend are running
2. Test login with existing credentials
3. Check browser DevTools Network tab for actual requests
4. If issues persist, share the exact error message from browser console

## Quick Command Reference

```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend
npm run dev

# Terminal 3 - Test (optional)
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password"}'
```

---

**Status**: ✅ 404 Error Fixed - Vite proxy now properly routes requests to backend
