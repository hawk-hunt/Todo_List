import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import TaskColumn from '../components/TaskColumn';
import '../styles/KanbanBoard.css';

export default function Dashboard() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Design dashboard layout',
      description: 'Create wireframes for dashboard UI',
      status: 'todo',
      assignee: 'John',
      date: 'Jan 28'
    },
    {
      id: 2,
      title: 'Setup React project',
      description: 'Initialize React with Vite',
      status: 'inwork',
      assignee: 'Sarah',
      date: 'Jan 27'
    },
    {
      id: 3,
      title: 'Create components',
      description: 'Build reusable React components',
      status: 'inwork',
      assignee: 'Mike',
      date: 'Jan 27'
    },
    {
      id: 4,
      title: 'Add styling',
      description: 'Apply CSS and styling',
      status: 'done',
      assignee: 'Emma',
      date: 'Jan 26'
    },
    {
      id: 5,
      title: 'Test components',
      description: 'Write and run unit tests',
      status: 'done',
      assignee: 'Alex',
      date: 'Jan 26'
    }
  ]);

  const handleAddTask = (status, taskData) => {
    const newTask = {
      id: Date.now(),
      title: taskData.title,
      description: taskData.description,
      status,
      assignee: 'User',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    };
    setTasks([...tasks, newTask]);
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <div className="dashboard">
      {/* Navbar */}
      <Navbar />

      <div className="dashboard-body">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="main-content">
          {/* Page Header */}
          <div className="page-header">
            <div className="page-title-section">
              <h1>To Do List</h1>
              <nav className="breadcrumb">
                <span>Dashboard</span>
                <span>/</span>
                <span>To Do List</span>
              </nav>
            </div>
          </div>

          {/* Kanban Board */}
          <div className="kanban-board">
            <TaskColumn
              title="To Do"
              status="todo"
              tasks={tasks}
              onAddTask={handleAddTask}
              onDeleteTask={handleDeleteTask}
            />
            <TaskColumn
              title="In Work"
              status="inwork"
              tasks={tasks}
              onAddTask={handleAddTask}
              onDeleteTask={handleDeleteTask}
            />
            <TaskColumn
              title="Done"
              status="done"
              tasks={tasks}
              onAddTask={handleAddTask}
              onDeleteTask={handleDeleteTask}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
