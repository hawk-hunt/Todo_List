# Copilot Instructions for Todo Application

## Architecture Overview

**Stack**: React + Vite (frontend) with Express backend; localStorage-based client-side state.

- **Frontend** (`/src`): React SPA using React Router for authentication and todo management
- **Backend** (`/backend`): Express server (minimal setup, not yet fully integrated)
- **Data Storage**: Primarily localStorage; user/task data persists client-side
- **Key Libraries**: react-router-dom, bcryptjs (password hashing), express, mongoose (configured but not active)

## Core Patterns & Conventions

### State Management
- **Local State**: Use React `useState` for component-level state (e.g., form inputs, UI toggles)
- **Persistence**: Always sync state to localStorage via `useEffect` with debouncing when appropriate
  - Example: [Todo.jsx](src/pages/Todo.jsx#L33-L38) debounces task saves to prevent excessive writes
  - Pattern: `localStorage.setItem(key, JSON.stringify(data))` and parse with `JSON.parse(localStorage.getItem(key)||'[]')`
- **Authentication**: Stored as JSON in `auth` localStorage key: `{ email, username }`

### Component Structure
- **Pages** (`/src/pages`): Full-page components like Login, Todo, Register—receive `user` and `onAuth` props
- **Components** (`/src/components`): Reusable UI components (Header, Task, Footer, etc.)
- **Props Pattern**: Parent components (App.jsx) manage user state and pass `user`, `onAuth`, callbacks (e.g., `onSignOut`)
  
### Task/Todo Model
```javascript
{ id, title, description, done, priority, dueDate, labels: [], subtasks: [] }
```
- Tasks stored per user with key: `tasks_${user.email}`
- Subtasks embedded; alerts stored separately in `alerts_${user.email}`
- No backend sync—all data is local to user's browser

### Routing & Auth Flow
- **Routes** (App.jsx): `/login`, `/register`, `/forgot`, `/reset`, `/todo`, `/signed-out`
- **Auth Check**: `getAuth()` reads localStorage; null = redirect to login
- **Rate Limiting**: [auth.js](src/lib/auth.js) implements in-memory rate limiting for login/reset attempts
- **Sign Out**: Clears `auth` localStorage and redirects to `/signed-out`

### Theme & Dark Mode
- **Toggle**: `toggleDark()` in App.jsx manages dark theme
- **Storage**: Sets `theme_dark` localStorage key when enabled
- **Application**: Applied via `document.documentElement.classList.toggle('dark', dark)`

### Service Worker & Offline
- [registerServiceWorker.js](src/registerServiceWorker.js) registers `/public/sw.js` for offline support
- Not critical to core features; wrapped in try-catch

## Development Workflow

### Build & Run
```bash
# Install root + frontend dependencies
npm install
npm run dev          # Vite dev server (frontend)

# Backend (separate terminal)
cd backend
npm install
npm run dev          # nodemon-watched Express server (port 5000)
```

### Linting
- **Config**: [eslint.config.js](eslint.config.js) uses flat ESLint with React hooks/refresh plugins
- **Rule**: Variables starting with capitals (e.g., `MY_CONST`) ignored in `no-unused-vars`

### Vite Configuration
- **HMR**: Hot Module Replacement enabled for fast refresh during development
- **React Plugin**: Uses @vitejs/plugin-react for JSX transformation

## Critical Developer Workflows

1. **Adding a New Page**: Create `.jsx` in `/src/pages`, add route in App.jsx, follow page structure (auth check, callbacks)
2. **Creating a Component**: Place in `/src/components`, use functional component + hooks, accept props from parent
3. **Saving User Data**: Always use localStorage with `user.email` as key prefix for isolation
4. **Password Operations**: Use `hashPassword()` and `comparePassword()` from [auth.js](src/lib/auth.js)
5. **Testing Auth Flow**: Manually test localStorage state; no test suite configured yet

## Integration Points & Dependencies

- **bcryptjs**: Client-side password hashing (browser implementation)
- **react-router-dom v7**: Client-side routing and navigation
- **Express**: Backend ready but not integrated; CORS configured
- **mongoose**: Listed but not initialized; future database integration
- **dotenv**: Loads environment variables (backend uses `process.env.PORT`, default 5000)

## Project-Specific Notes

- **No Database**: Auth and tasks stored in localStorage only; users simulated in-memory
- **Offline First**: Service worker and localStorage-only design prioritize offline functionality
- **Minimal Backend**: Express server exists but doesn't handle auth or tasks; frontend is self-contained
- **Removed Features**: Public pages (About, Features, Pricing, etc.) removed per requirements—kept only auth + todo
- **Rate Limiting**: Stored in localStorage under `rl_*` keys; prevents brute-force login attempts

## Common Pitfalls to Avoid

- ❌ Forgetting to persist state changes to localStorage
- ❌ Not checking `user` before rendering authenticated pages
- ❌ Not parsing/stringifying JSON when reading/writing localStorage
- ❌ Assuming backend handles auth—it doesn't (yet)
- ❌ Not wrapping service worker registration in try-catch (crashes in some environments)
