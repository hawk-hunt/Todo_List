import '../styles/TaskCard.css';

export default function TaskCard({ task, onDelete }) {
  return (
    <div className="task-card">
      <div className="task-card-header">
        <h4 className="task-title">{task.title}</h4>
        <button 
          className="task-delete"
          onClick={() => onDelete(task.id)}
          title="Delete task"
        >
          ✕
        </button>
      </div>

      <p className="task-description">{task.description}</p>

      <div className="task-footer">
        <div className="task-avatar">{task.assignee.charAt(0)}</div>
        <span className="task-date">{task.date}</span>
      </div>
    </div>
  );
}
