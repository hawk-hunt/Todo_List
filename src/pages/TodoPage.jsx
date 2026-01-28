/**
 * TodoPage.jsx
 * Task management page
 * CRUD operations for tasks with localStorage
 */

import { useState, useEffect } from 'react';
import '../styles/Pages.css';
import '../styles/Todo.css';

export default function TodoPage() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [editingId, setEditingId] = useState(null);

  // Load tasks from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('todo-tasks');
    if (saved) {
      setTasks(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage
  const saveTasks = (newTasks) => {
    localStorage.setItem('todo-tasks', JSON.stringify(newTasks));
    setTasks(newTasks);
  };

  // Create or update task
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    if (editingId) {
      const updated = tasks.map(t =>
        t.id === editingId ? { ...t, ...formData } : t
      );
      saveTasks(updated);
      setEditingId(null);
    } else {
      const newTask = {
        id: Date.now().toString(),
        title: formData.title,
        description: formData.description,
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      saveTasks([newTask, ...tasks]);
    }

    setFormData({ title: '', description: '' });
    setShowForm(false);
  };

  // Toggle task status
  const toggleStatus = (id) => {
    const updated = tasks.map(t =>
      t.id === id ? { ...t, status: t.status === 'pending' ? 'completed' : 'pending' } : t
    );
    saveTasks(updated);
  };

  // Delete task
  const deleteTask = (id) => {
    if (window.confirm('Delete this task?')) {
      saveTasks(tasks.filter(t => t.id !== id));
    }
  };

  // Edit task
  const editTask = (task) => {
    setFormData({ title: task.title, description: task.description });
    setEditingId(task.id);
    setShowForm(true);
  };

  // Filter tasks
  const filteredTasks = filter === 'all' 
    ? tasks 
    : tasks.filter(t => t.status === filter);

  const stats = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    completed: tasks.filter(t => t.status === 'completed').length
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Tasks</h1>
        <p>Manage your daily tasks</p>
      </div>

      <div className="page-content">
        {/* Stats */}
        <div className="stats-bar">
          <div className="stat">
            <span className="stat-num">{stats.total}</span>
            <span className="stat-label">Total</span>
          </div>
          <div className="stat">
            <span className="stat-num">{stats.pending}</span>
            <span className="stat-label">Pending</span>
          </div>
          <div className="stat">
            <span className="stat-num">{stats.completed}</span>
            <span className="stat-label">Completed</span>
          </div>
        </div>

        {/* Create Task Button */}
        <div className="task-actions">
          <button 
            className="btn-primary"
            onClick={() => {
              setShowForm(!showForm);
              setEditingId(null);
              setFormData({ title: '', description: '' });
            }}
          >
            {showForm ? '✕ Cancel' : '+ Create Task'}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <form className="task-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Task title..."
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              maxLength={100}
            />
            <textarea
              placeholder="Description (optional)..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              maxLength={500}
              rows={3}
            />
            <button type="submit" className="btn-primary">
              {editingId ? 'Update Task' : 'Create Task'}
            </button>
          </form>
        )}

        {/* Filter */}
        <div className="filter-bar">
          {['all', 'pending', 'completed'].map(f => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Tasks List */}
        <div className="tasks-list">
          {filteredTasks.length === 0 ? (
            <div className="empty-state">
              <p>No tasks yet</p>
            </div>
          ) : (
            filteredTasks.map(task => (
              <div 
                key={task.id} 
                className={`task-item ${task.status === 'completed' ? 'completed' : ''}`}
              >
                <input
                  type="checkbox"
                  checked={task.status === 'completed'}
                  onChange={() => toggleStatus(task.id)}
                  className="task-checkbox"
                />
                <div className="task-content">
                  <h4>{task.title}</h4>
                  {task.description && <p>{task.description}</p>}
                  <span className="task-date">
                    {new Date(task.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="task-actions-inline">
                  <button 
                    className="btn-small"
                    onClick={() => editTask(task)}
                  >
                    Edit
                  </button>
                  <button 
                    className="btn-small btn-danger"
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
