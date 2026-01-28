# Todo App - Full Stack

A modern full-stack todo application with user authentication, built with React, Vite, Express, and MongoDB.

## Features

- **User Authentication**: Register and login with JWT tokens
- **Protected Routes**: Dashboard only accessible after authentication
- **Modern UI**: Beautiful gradient design with responsive layout
- **JWT Security**: Secure token-based authentication
- **MongoDB Database**: User data persistence
- **API Integration**: Axios with interceptors for automatic token handling

## Tech Stack

### Frontend
- React 18
- Vite (build tool)
- React Router (routing)
- Axios (API calls)
- CSS3 with gradients and animations

### Backend
- Node.js & Express
- MongoDB & Mongoose
- JWT (jsonwebtoken)
- Bcryptjs (password hashing)
- CORS enabled

## Project Structure

```
todo/
├── src/                 # React frontend
│   ├── pages/          # Page components (Login, Register, Dashboard)
│   ├── components/     # Reusable components
│   ├── lib/            # API service and auth utilities
│   └── App.jsx         # Main app routing
│
├── backend/            # Node.js backend
│   ├── routes/         # API route handlers
│   ├── models/         # MongoDB schemas (User)
│   ├── middleware/     # Auth middleware
│   └── server.js       # Express server entry point
│
├── package.json        # Frontend dependencies
├── vite.config.js      # Vite configuration
└── backend/package.json # Backend dependencies
```

## Setup & Installation

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- Git

### Frontend Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

Frontend runs on `http://localhost:5173`

### Backend Setup

1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/todo-app
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
```

4. Start server:
```bash
node server.js
```

Backend runs on `http://localhost:5000`

## Authentication Flow

1. **Register**: User creates account with name, email, and password
   - Password is hashed using bcryptjs
   - User stored in MongoDB

2. **Login**: User enters email and password
   - Backend verifies password
   - JWT token generated and returned
   - Token saved in localStorage

3. **Protected Routes**: 
   - Axios interceptor adds token to all requests
   - Backend middleware verifies token
   - User data accessed from token payload

4. **Dashboard**: 
   - Fetches user data using JWT token
   - Displays user information
   - Logout removes token and redirects to login

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### User (Protected)
- `GET /api/user/dashboard` - Get user dashboard data (requires JWT)

### Health
- `GET /api/health` - Health check

## Environment Variables

### Frontend
No additional env vars needed (API base URL is hardcoded to localhost:5000)

### Backend
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/todo-app
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
NODE_ENV=development
```

## Usage

1. **Register**: Click "Register" and create a new account
2. **Login**: Use your email and password to login
3. **Dashboard**: View your user information and account details
4. **Logout**: Click logout button to return to login page

## Security Features

- ✅ Bcryptjs password hashing (10 salt rounds)
- ✅ JWT token validation on protected routes
- ✅ Token stored securely in localStorage
- ✅ CORS enabled for frontend communication
- ✅ Password field not returned in API responses

## Color Scheme

- Primary Gradient: `#667eea` → `#764ba2` (Purple)
- Background: Subtle light gradient
- Text: Dark gray (#333) for primary, gray (#666) for secondary
- Alerts: Red (#e74c3c) for errors, Green (#3c3) for success

## Future Enhancements

- [ ] Add todo CRUD operations
- [ ] User profile management
- [ ] Password reset functionality
- [ ] Email verification
- [ ] Real-time notifications
- [ ] Task sharing between users
- [ ] Mobile app

## License

MIT
