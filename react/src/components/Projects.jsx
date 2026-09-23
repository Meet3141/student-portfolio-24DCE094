import React, { useState, useEffect, useCallback } from 'react';
import { getTasks, createTask, updateTask, deleteTask, login, register, getMe } from '../api';
import TaskForm from './TaskForm';
import TaskCard from './TaskCard';
import TaskFilter from './TaskFilter';
import EditTaskModal from './EditTaskModal';
import DeleteConfirmModal from './DeleteConfirmModal';
import TaskStats from './TaskStats';
import AlertBanner from './AlertBanner';
import { LogOut } from 'lucide-react';

export default function Projects() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  
  // Auth state
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // Task state
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [processingTaskId, setProcessingTaskId] = useState(null);

  const [editingTask, setEditingTask] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [deletingTask, setDeletingTask] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [filter, setFilter] = useState('all');

  // Check auth on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      fetchUser();
    }
  }, []);

  const fetchUser = async () => {
    try {
      const data = await getMe();
      setUser(data);
    } catch (err) {
      if (err.status === 401) {
        handleLogout();
      }
    }
  };

  const notifySuccess = (msg) => {
    setSuccessMessage(msg);
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setErrorMessage('');
    try {
      if (authMode === 'register') {
        await register(email, password);
        notifySuccess('Registration successful! You can now log in.');
        setAuthMode('login');
      } else {
        const data = await login(email, password);
        localStorage.setItem('token', data.token);
        setIsAuthenticated(true);
        fetchUser();
      }
    } catch (err) {
      setErrorMessage(err.message || 'Authentication failed');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
    setTasks([]);
  };

  const fetchTasks = useCallback(async () => {
    if (!isAuthenticated) return;
    setIsLoading(true);
    setErrorMessage('');
    try {
      const response = await getTasks();
      if (response && Array.isArray(response.data)) {
        setTasks(response.data);
      } else if (Array.isArray(response)) {
        setTasks(response);
      } else {
        setTasks([]);
      }
    } catch (err) {
      console.error('Error fetching tasks:', err);
      if (err.status === 401) {
        handleLogout();
      } else {
        setErrorMessage(err.message || 'Could not connect to backend server.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleCreateTask = async (taskData) => {
    setIsSubmitting(true);
    setErrorMessage('');
    try {
      const response = await createTask(taskData);
      const newTask = response.data || response;
      setTasks((prev) => [newTask, ...prev]);
      notifySuccess('Task added');
      return true;
    } catch (err) {
      if (err.status === 401) handleLogout();
      else setErrorMessage(err.message || 'Failed to create task.');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleStatus = async (task) => {
    setProcessingTaskId(task._id);
    setErrorMessage('');
    const newStatus = !task.completed;

    try {
      const response = await updateTask(task._id, {
        title: task.title,
        description: task.description,
        completed: newStatus,
      });
      const updated = response.data || response;
      setTasks((prev) =>
        prev.map((t) => (t._id === task._id ? { ...t, ...updated, completed: newStatus } : t))
      );
    } catch (err) {
      if (err.status === 401) handleLogout();
      else setErrorMessage(err.message || 'Failed to update task.');
    } finally {
      setProcessingTaskId(null);
    }
  };

  const handleUpdateTask = async (id, taskData) => {
    setIsUpdating(true);
    setErrorMessage('');
    try {
      const response = await updateTask(id, taskData);
      const updated = response.data || response;
      setTasks((prev) =>
        prev.map((t) => (t._id === id ? { ...t, ...updated } : t))
      );
      notifySuccess('Task updated');
      return true;
    } catch (err) {
      if (err.status === 401) handleLogout();
      else setErrorMessage(err.message || 'Failed to save changes.');
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingTask) return;
    const id = deletingTask._id;
    setIsDeleting(true);
    setErrorMessage('');
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
      notifySuccess('Task deleted');
      setDeletingTask(null);
    } catch (err) {
      if (err.status === 401) handleLogout();
      else setErrorMessage(err.message || 'Failed to delete task.');
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const counts = {
    all: tasks.length,
    active: tasks.filter((t) => !t.completed).length,
    completed: tasks.filter((t) => t.completed).length,
  };

  // Auth UI
  if (!isAuthenticated) {
    return (
      <div className="section auth-container" style={{ maxWidth: 400, margin: '80px auto', textAlign: 'center' }}>
        <h2>{authMode === 'login' ? 'Welcome Back' : 'Create an Account'}</h2>
        <p style={{ color: '#6b7280', marginBottom: '20px' }}>
          {authMode === 'login' ? 'Login to manage your tasks' : 'Register to get started'}
        </p>

        {errorMessage && <AlertBanner type="danger" message={errorMessage} onDismiss={() => setErrorMessage('')} />}
        {successMessage && <AlertBanner type="success" message={successMessage} onDismiss={() => setSuccessMessage('')} />}

        <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input
            type="email"
            placeholder="Email address"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password (min 6 chars)"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary" disabled={authLoading}>
            {authLoading ? 'Please wait...' : (authMode === 'login' ? 'Login' : 'Register')}
          </button>
        </form>

        <p style={{ marginTop: '20px', fontSize: '14px', color: '#6b7280' }}>
          {authMode === 'login' ? "Don't have an account? " : "Already have an account? "}
          <button 
            type="button" 
            style={{ background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', fontWeight: 'bold' }}
            onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
          >
            {authMode === 'login' ? 'Sign up' : 'Log in'}
          </button>
        </p>
      </div>
    );
  }

  // Main Task Manager UI
  return (
    <div className="app-container section">
      <header className="app-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 className="brand-title" style={{ margin: 0 }}>My Tasks</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <span style={{ fontSize: '14px', color: '#6b7280' }}>
            {user ? user.email : 'Loading...'}
          </span>
          <button onClick={handleLogout} className="btn-icon" title="Logout" style={{ color: '#dc2626' }}>
            <LogOut size={18} />
          </button>
        </div>
      </header>

      <AlertBanner type="danger" message={errorMessage} onDismiss={() => setErrorMessage('')} />
      <AlertBanner type="success" message={successMessage} onDismiss={() => setSuccessMessage('')} />

      <TaskStats tasks={tasks} />

      <TaskForm onTaskCreated={handleCreateTask} isSubmitting={isSubmitting} />

      {tasks.length > 0 && (
        <TaskFilter filter={filter} onFilterChange={setFilter} counts={counts} />
      )}

      {isLoading ? (
        <div className="state-box">
          <div className="spinner" style={{ marginBottom: '0.5rem' }} />
          <div>Loading tasks...</div>
        </div>
      ) : tasks.length === 0 ? (
        <div className="state-box">
          No tasks yet. Add your first task above.
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="state-box">
          No {filter} tasks.
        </div>
      ) : (
        <div className="task-list">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onToggleStatus={handleToggleStatus}
              onEdit={setEditingTask}
              onDelete={setDeletingTask}
              isProcessing={processingTaskId === task._id}
            />
          ))}
        </div>
      )}

      <EditTaskModal
        task={editingTask}
        isOpen={Boolean(editingTask)}
        onClose={() => setEditingTask(null)}
        onUpdate={handleUpdateTask}
        isUpdating={isUpdating}
      />

      <DeleteConfirmModal
        isOpen={Boolean(deletingTask)}
        taskTitle={deletingTask?.title || ''}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingTask(null)}
        isDeleting={isDeleting}
      />
    </div>
  );
}
