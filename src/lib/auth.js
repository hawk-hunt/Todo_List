const API_BASE = 'http://localhost:5000/api';

function now() { return Date.now() }

// Rate limiting for login and reset requests
export function isRateLimited(key, limit=5, windowMs=15*60*1000){
  const keyName = `rl_${key}`
  const arr = JSON.parse(localStorage.getItem(keyName)||'[]')
  const cutoff = now() - windowMs
  const recent = arr.filter(t=> t > cutoff)
  if(recent.length >= limit) return true
  recent.push(now())
  localStorage.setItem(keyName, JSON.stringify(recent))
  return false
}

// Login with backend
export async function login(email, password) {
  try {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    return data;
  } catch (error) {
    throw error;
  }
}

// Register with backend
export async function register(username, email, password) {
  try {
    const response = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Registration failed');
    }

    return data;
  } catch (error) {
    throw error;
  }
}

// Request password reset
export async function requestPasswordReset(email) {
  try {
    const response = await fetch(`${API_BASE}/auth/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to request password reset');
    }

    return data;
  } catch (error) {
    throw error;
  }
}

// Reset password with token
export async function resetPassword(token, newPassword) {
  try {
    const response = await fetch(`${API_BASE}/auth/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, newPassword }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to reset password');
    }

    return data;
  } catch (error) {
    throw error;
  }
}

// Get tasks from backend
export async function getTasks(token) {
  try {
    const response = await fetch(`${API_BASE}/tasks`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch tasks');
    }

    return data;
  } catch (error) {
    throw error;
  }
}

// Create task
export async function createTask(task, token) {
  try {
    const response = await fetch(`${API_BASE}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(task),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to create task');
    }

    return data;
  } catch (error) {
    throw error;
  }
}

// Update task
export async function updateTask(id, task, token) {
  try {
    const response = await fetch(`${API_BASE}/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(task),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to update task');
    }

    return data;
  } catch (error) {
    throw error;
  }
}

// Delete task
export async function deleteTask(id, token) {
  try {
    const response = await fetch(`${API_BASE}/tasks/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to delete task');
    }

    return data;
  } catch (error) {
    throw error;
  }
}
