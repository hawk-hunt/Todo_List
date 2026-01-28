import { useState } from 'react';
import TaskCard from './TaskCard';
import '../styles/TaskColumn.css';

export default function TaskColumn({ title, status, tasks, onAddTask, onDeleteTask }) {
  const [isAdding, setIsAdding] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '' });

  const columnTasks = tasks.filter(task => task.status === status);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.title.trim()) {
      onAddTask(status, newTask);
      setNewTask({ title: '', description: '' });
      setIsAdding(false);
    }
  };

  return (
    <div className="task-column">
      {/* Column Header */}
      <div className="column-header">
        <h2 className="column-title">{title}</h2>
        <span className="task-count">{columnTasks.length}</span>
      </div>

      {/* New Task Button */}
      <button 
        className="add-task-btn"
        onClick={() => setIsAdding(!isAdding)}
      >
        + New Task
      </button>

      {/* Add Task Form */}
      {isAdding && (
        <form className="add-task-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Task title..."
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            className="form-input"
            autoFocus
          />
          <textarea
            placeholder="Description..."
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            className="form-input"
            rows="2"
          />
          <div className="form-actions">
            <button type="submit" className="btn-submit">Add</button>
            <button 
              type="button" 
              className="btn-cancel"
              onClick={() => {
                setIsAdding(false);
                setNewTask({ title: '', description: '' });
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Tasks List */}
      <div className="tasks-list">
        {columnTasks.length === 0 ? (
          <div className="empty-state">
            <p>No tasks yet</p>
          </div>
        ) : (
          columnTasks.map(task => (
            <TaskCard 
              key={task.id}
              task={task}
              onDelete={onDeleteTask}
            />
          ))
        )}
      </div>
    </div>
  );
}
