/**
 * TodoForm Component
 * Modal form for creating and editing tasks
 * 
 * Features:
 * - Input validation
 * - Clear form after submission
 * - Close on backdrop click or close button
 * - Smooth animations
 * - Support for edit mode
 */

import { useState, useEffect } from 'react';
import '../styles/TodoForm.css';

export default function TodoForm({ isOpen, onClose, onSubmit, initialTask = null }) {
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

  const [errors, setErrors] = useState({});

  /**
   * Load initial task data if editing
   */
  useEffect(() => {
    if (isOpen) {
      if (initialTask) {
        setFormData({
          title: initialTask.title,
          description: initialTask.description,
        });
      } else {
        setFormData({ title: '', description: '' });
      }
      setErrors({});
    }
  }, [isOpen, initialTask]);

  /**
   * Handle input changes
   * Update form state as user types
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value.trim(),
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  /**
   * Validate form data
   * Returns true if valid, false otherwise
   */
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length > 100) {
      newErrors.title = 'Title must be less than 100 characters';
    }

    if (formData.description.length > 500) {
      newErrors.description = 'Description must be less than 500 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle form submission
   * Validate and call parent onSubmit
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Call parent submit handler
    if (initialTask) {
      // Update mode - pass just the changed fields
      onSubmit(formData);
    } else {
      // Create mode - add metadata
      onSubmit({
        ...formData,
        status: 'pending',
        createdAt: new Date().toISOString(),
      });
    }

    // Reset form
    setFormData({ title: '', description: '' });
    setErrors({});
  };

  /**
   * Handle modal close
   * Reset form state
   */
  const handleClose = () => {
    setFormData({ title: '', description: '' });
    setErrors({});
    onClose();
  };

  /**
   * Handle backdrop click
   * Close modal when clicking outside the form
   */
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-container">
        {/* Modal header */}
        <div className="modal-header">
          <h2>{initialTask ? 'Edit Task' : 'Create New Task'}</h2>
          <button
            className="modal-close-btn"
            onClick={handleClose}
            title="Close (ESC)"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Modal body - Form */}
        <form onSubmit={handleSubmit} className="modal-form">
          {/* Title field */}
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Task Title *
            </label>
            <input
              id="title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter task title..."
              maxLength="100"
              className={`form-input ${errors.title ? 'input-error' : ''}`}
              autoFocus
            />
            {errors.title && (
              <span className="error-message">{errors.title}</span>
            )}
            <span className="char-count">
              {formData.title.length}/100
            </span>
          </div>

          {/* Description field */}
          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Description (Optional)
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter task description..."
              maxLength="500"
              rows="4"
              className={`form-textarea ${errors.description ? 'input-error' : ''}`}
            />
            {errors.description && (
              <span className="error-message">{errors.description}</span>
            )}
            <span className="char-count">
              {formData.description.length}/500
            </span>
          </div>

          {/* Form actions */}
          <div className="modal-actions">
            <button
              type="button"
              onClick={handleClose}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              {initialTask ? 'Update Task' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
