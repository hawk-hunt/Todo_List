# ✅ 404 Error Fix - Complete Solution

## Problem Fixed
**Error:** "Request failed with status code 404" when logging in with existing database data

## Root Cause
When we changed API baseURL to `/api` (relative path), the frontend was requesting `/api/auth/login` from port 5173, but the backend API is on port 5000. The request was hitting `localhost:5173/api/auth/login` which doesn't exist (404).

## Solution Applied

### 1. Vite Dev Server Proxy Configuration
**File:** `vite.config.js`

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

Now all `/api/*` requests are automatically forwarded to the backend on port 5000.

### 2. Smart API Initialization
**File:** `src/lib/api.js`

```javascript
const API_BASE_URL = import.meta.env.DEV 
  ? '/api'  // Use proxy in development
  : (import.meta.env.VITE_API_URL || 'http://localhost:5000/api');
```

- **Development:** Uses relative `/api` (proxied by Vite)
- **Production:** Uses environment variable or falls back to full URL

## Updated Files
- ✅ `vite.config.js` - Added proxy configuration
- ✅ `src/lib/api.js` - Smart API baseURL handling
- ✅ `backend/.env.example` - Example configuration file

## How to Use

### Start Both Servers (in separate terminals)

**Terminal 1 - Backend:**
```bash
cd backend
npm install
npm run dev
```
Should show:
```
✓ MongoDB connected
🚀 Server running on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```
Should show:
```
VITE v5.0.0  ready in 234 ms
➜  Local:   http://localhost:5173/
```

### Test Login
1. Visit `http://localhost:5173`
2. Redirects to `/login`
3. Login with existing user credentials
4. ✅ Should successfully authenticate and redirect to `/kanban`

## Request Flow (Development)

```
Browser Request: POST /api/auth/login
        ↓
Vite Dev Server (localhost:5173)
        ↓
Proxy Rule Matches /api
        ↓
Forwards to http://localhost:5000/api/auth/login
        ↓
Backend Express Server
        ↓
Routes to auth handler
        ↓
Queries MongoDB for user
        ↓
Validates password
        ↓
Returns JWT token
        ↓
Response sent back to Browser
```

## Debugging

### Check if requests are being proxied
1. Open DevTools (F12)
2. Go to Network tab
3. Try logging in
4. Look for `/api/auth/login` request
5. Should show status 200 (success) not 404

### Verify Backend Connection
```bash
curl http://localhost:5000/api/health
```
Should return:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2026-01-27T..."
}
```

### Verify MongoDB Connection
Backend startup log should show:
```
✓ MongoDB connected
```

If not, check:
- MongoDB is installed
- MongoDB service is running
- `MONGO_URI` in `backend/.env` is correct

## Before & After

### Before (❌ Broken)
```
Frontend (localhost:5173)
  → Request /api/auth/login
  → Browser looks for localhost:5173/api/auth/login
  → Not found (404) ❌
```

### After (✅ Fixed)
```
Frontend (localhost:5173)
  → Request /api/auth/login
  → Vite intercepts
  → Forwards to localhost:5000/api/auth/login
  → Backend handles it
  → Returns response ✅
```

## Production Ready

For production deployment:
```bash
# Set backend URL
export VITE_API_URL=https://your-api-domain.com/api

# Build
npm run build

# Deploy dist folder
```

## Summary
✅ **Status:** 404 Error Fixed
✅ **Cause:** Proxy misconfiguration  
✅ **Solution:** Vite dev proxy added
✅ **Testing:** Start both servers, login should work
✅ **Production:** Environment variable based API URL

---

**Next Step:** Start both backend and frontend servers and test the login flow!
