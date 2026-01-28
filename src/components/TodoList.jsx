/**
 * TodoList Component
 * Displays all tasks with filtering and sorting
 * 
 * Features:
 * - Display tasks in organized layout
 * - Filter by status (All, Pending, Completed)
 * - Sort options
 * - Empty state message
 * - Task count display
 * - Animations for add/remove
 */

import { useState } from 'react';
import TodoItem from './TodoItem';
import '../styles/TodoList.css';

export default function TodoList({
  tasks,
  onUpdate,
  onDelete,
  onEdit,
  loading,
}) {
  // Filter state
  const [filter, setFilter] = useState('all');

  /**
   * Filter tasks based on selected filter
   * all: Show all tasks
   * pending: Show only pending tasks
   * completed: Show only completed tasks
   */
  const filteredTasks = tasks.filter(task => {
    if (filter === 'pending') return task.status === 'pending';
    if (filter === 'completed') return task.status === 'completed';
    return true;
  });

  /**
   * Sort tasks by creation date (newest first)
   * Then by status (pending before completed)
   */
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    const dateCompare = new Date(b.createdAt) - new Date(a.createdAt);
    if (dateCompare !== 0) return dateCompare;
    return a.status === 'pending' ? -1 : 1;
  });

  // Statistics
  const totalTasks = tasks.length;
  const pendingCount = tasks.filter(t => t.status === 'pending').length;
  const completedCount = tasks.filter(t => t.status === 'completed').length;

  // Empty state
  if (loading) {
    return (
      <div className="todo-list-container">
        <div className="loading-state">
          <div className="spinner" />
          <p>Loading tasks...</p>
        </div>
      </div>
    );
  }

  if (totalTasks === 0) {
    return (
      <div className="todo-list-container">
        <div className="empty-state">
          <div className="empty-icon">✨</div>
          <h3>No tasks yet</h3>
          <p>Create your first task to get started!</p>
        </div>
      </div>
    );
  }

  if (sortedTasks.length === 0 && filter !== 'all') {
    return (
      <div className="todo-list-container">
        <div className="filter-bar">
          <div className="filter-buttons">
            <button
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All ({totalTasks})
            </button>
            <button
              className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
              onClick={() => setFilter('pending')}
            >
              Pending ({pendingCount})
            </button>
            <button
              className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
              onClick={() => setFilter('completed')}
            >
              Completed ({completedCount})
            </button>
          </div>
        </div>

        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <h3>No tasks found</h3>
          <p>Try selecting a different filter</p>
        </div>
      </div>
    );
  }

  return (
    <div className="todo-list-container">
      {/* Statistics bar */}
      <div className="stats-bar">
        <div className="stat-item">
          <span className="stat-number">{totalTasks}</span>
          <span className="stat-label">Total</span>
        </div>
        <div className="stat-divider" />
        <div className="stat-item">
          <span className="stat-number">{pendingCount}</span>
          <span className="stat-label">Pending</span>
        </div>
        <div className="stat-divider" />
        <div className="stat-item">
          <span className="stat-number">{completedCount}</span>
          <span className="stat-label">Completed</span>
        </div>
      </div>

      {/* Filter bar */}
      <div className="filter-bar">
        <div className="filter-buttons">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All ({totalTasks})
          </button>
          <button
            className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
            onClick={() => setFilter('pending')}
          >
            Pending ({pendingCount})
          </button>
          <button
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed ({completedCount})
          </button>
        </div>
      </div>

      {/* Tasks grid */}
      <div className="tasks-grid">
        {sortedTasks.map(task => (
          <TodoItem
            key={task.id}
            task={task}
            onUpdate={onUpdate}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </div>

      {/* Completion message */}
      {filter === 'completed' && completedCount > 0 && (
        <div className="completion-message">
          <p>Great job! 🎉 You've completed {completedCount} task{completedCount !== 1 ? 's' : ''}.</p>
        </div>
      )}
    </div>
  );
}
