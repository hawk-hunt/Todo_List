/**
 * TodoItem Component
 * Individual task card with actions
 * 
 * Features:
 * - Toggle task status (pending/completed)
 * - Edit task
 * - Delete with confirmation
 * - Visual feedback for completed tasks
 * - Show creation date and formatted time
 */

import { useState } from 'react';
import '../styles/TodoItem.css';

export default function TodoItem({ task, onUpdate, onDelete, onEdit }) {
  // Confirmation state for deletion
  const [showConfirm, setShowConfirm] = useState(false);

  /**
   * Format date to readable format
   * Example: "Jan 27, 2:30 PM"
   */
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  /**
   * Get days ago calculation
   * Example: "2 days ago"
   */
  const getDaysAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays} days ago`;
  };

  /**
   * Toggle task status
   * Changes between pending and completed
   */
  const handleToggleStatus = () => {
    onUpdate(task.id, {
      ...task,
      status: task.status === 'pending' ? 'completed' : 'pending',
    });
  };

  /**
   * Handle delete click
   * Shows confirmation popup
   */
  const handleDeleteClick = () => {
    setShowConfirm(true);
  };

  /**
   * Confirm delete
   * Closes popup and calls delete handler
   */
  const handleConfirmDelete = () => {
    setShowConfirm(false);
    onDelete(task.id);
  };

  /**
   * Cancel delete
   * Just closes confirmation popup
   */
  const handleCancelDelete = () => {
    setShowConfirm(false);
  };

  const isCompleted = task.status === 'completed';

  return (
    <>
      {/* Confirmation Popup */}
      {showConfirm && (
        <div className="confirmation-backdrop">
          <div className="confirmation-popup">
            <h3>Delete Task?</h3>
            <p>Are you sure you want to delete "{task.title}"? This action cannot be undone.</p>
            <div className="confirmation-actions">
              <button
                onClick={handleCancelDelete}
                className="btn-cancel"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="btn-delete-confirm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Task Card */}
      <div className={`todo-item ${isCompleted ? 'completed' : ''}`}>
        {/* Status indicator and checkbox */}
        <div className="todo-header">
          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              checked={isCompleted}
              onChange={handleToggleStatus}
              className="todo-checkbox"
              id={`task-${task.id}`}
              aria-label={`Mark "${task.title}" as ${isCompleted ? 'pending' : 'completed'}`}
            />
            <label htmlFor={`task-${task.id}`} className="checkbox-label" />
          </div>

          {/* Status badge */}
          <span className={`status-badge status-${task.status}`}>
            {task.status === 'pending' ? '⏱ Pending' : '✓ Completed'}
          </span>
        </div>

        {/* Task content */}
        <div className="todo-content" onClick={() => onEdit(task)}>
          <h3 className="todo-title">{task.title}</h3>
          {task.description && (
            <p className="todo-description">{task.description}</p>
          )}
          <div className="todo-meta">
            <span className="creation-date" title={formatDate(task.createdAt)}>
              {getDaysAgo(task.createdAt)}
            </span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="todo-actions">
          <button
            onClick={() => onEdit(task)}
            className="btn-action btn-edit"
            title="Edit task"
            aria-label={`Edit ${task.title}`}
          >
            <span>✎</span> Edit
          </button>
          <button
            onClick={handleDeleteClick}
            className="btn-action btn-delete"
            title="Delete task"
            aria-label={`Delete ${task.title}`}
          >
            <span>🗑</span> Delete
          </button>
        </div>
      </div>
    </>
  );
}
