import { useEffect, useState } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "../api";

function Projects() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showNotes, setShowNotes] = useState(false);
  const [priority, setPriority] = useState("medium"); // default
  
  const [actionLoading, setActionLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  // Tabs: 'all', 'active', 'completed'
  const [filter, setFilter] = useState("all");
  
  const [toast, setToast] = useState("");

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => {
      setToast("");
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Task title is required");
      return;
    }

    try {
      setActionLoading(true);
      setError("");
      
      const taskData = {
        title: title.trim(),
        description: description.trim(),
        priority
      };

      if (editingId) {
        const updatedTask = await updateTask(editingId, taskData);
        setTasks((currentTasks) =>
          currentTasks.map((t) => (t._id === editingId ? updatedTask : t))
        );
        showToast("Task updated successfully");
      } else {
        const newTask = await createTask(taskData);
        setTasks((currentTasks) => [...currentTasks, newTask]);
        showToast("Task added successfully");
      }

      // Reset form
      setTitle("");
      setDescription("");
      setShowNotes(false);
      setPriority("medium");
      setEditingId(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleEdit = (task) => {
    setEditingId(task._id);
    setTitle(task.title);
    setDescription(task.description || "");
    if (task.description) setShowNotes(true);
    setPriority(task.priority || "medium");
    setError("");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      setActionLoading(true);
      setError("");
      await deleteTask(id);
      setTasks((currentTasks) => currentTasks.filter((t) => t._id !== id));
      showToast("Task deleted successfully");
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const toggleComplete = async (task) => {
    try {
      const updatedTask = await updateTask(task._id, { completed: !task.completed });
      setTasks((currentTasks) =>
        currentTasks.map((t) => (t._id === task._id ? updatedTask : t))
      );
    } catch (err) {
      setError("Failed to update status");
    }
  };

  if (loading) {
    return (
      <section className="tm-container">
        <h2 className="tm-header">Tasks</h2>
        <div className="tm-loading">Loading your tasks...</div>
      </section>
    );
  }

  const activeTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);
  
  let displayedTasks = tasks;
  if (filter === "active") displayedTasks = activeTasks;
  if (filter === "completed") displayedTasks = completedTasks;

  return (
    <section className="tm-container">
      {/* Toast Notification */}
      {toast && <div className="tm-toast">{toast}</div>}

      <h2 className="tm-header">Tasks</h2>

      {error && <div className="tm-error">{error}</div>}

      {/* Input Section */}
      <div className="tm-form-card">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="tm-input-main"
            placeholder="What needs to be done?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={actionLoading}
          />
          
          {showNotes && (
            <textarea
              className="tm-input-notes"
              placeholder="Add details/notes here..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={actionLoading}
              rows="3"
            />
          )}

          <div className="tm-form-actions">
            {!showNotes && (
              <button 
                type="button" 
                className="tm-btn-ghost" 
                onClick={() => setShowNotes(true)}
              >
                + Add notes
              </button>
            )}
            {showNotes && <div></div> /* flex spacer */}
            
            <div className="tm-form-right">
              {editingId && (
                <button
                  type="button"
                  className="tm-btn-ghost"
                  onClick={() => {
                    setEditingId(null);
                    setTitle("");
                    setDescription("");
                    setShowNotes(false);
                  }}
                >
                  Cancel
                </button>
              )}
              <button 
                type="submit" 
                className="tm-btn-primary" 
                disabled={actionLoading || !title.trim()}
              >
                {actionLoading ? "..." : editingId ? "Update Task" : "Add Task"}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Tabs & Stats */}
      <div className="tm-toolbar">
        <div className="tm-tabs">
          <button 
            className={`tm-tab ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All ({tasks.length})
          </button>
          <button 
            className={`tm-tab ${filter === 'active' ? 'active' : ''}`}
            onClick={() => setFilter('active')}
          >
            Active ({activeTasks.length})
          </button>
          <button 
            className={`tm-tab ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed ({completedTasks.length})
          </button>
        </div>
        <div className="tm-stats">
          {completedTasks.length} of {tasks.length} completed
        </div>
      </div>

      {/* Task List */}
      <div className="tm-list">
        {displayedTasks.length === 0 ? (
          <div className="tm-empty">No tasks found.</div>
        ) : (
          displayedTasks.map((task) => (
            <div className="tm-card" key={task._id}>
              
              <div className="tm-card-checkbox">
                <input 
                  type="checkbox" 
                  checked={task.completed} 
                  onChange={() => toggleComplete(task)}
                />
              </div>
              
              <div className="tm-card-content">
                <h3 className={`tm-card-title ${task.completed ? 'completed' : ''}`}>
                  {task.title}
                </h3>
                {task.description && (
                  <p className="tm-card-desc">{task.description}</p>
                )}
              </div>
              
              <div className="tm-card-actions">
                <button 
                  className="tm-icon-btn" 
                  onClick={() => handleEdit(task)}
                  title="Edit"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                </button>
                <button 
                  className="tm-icon-btn delete" 
                  onClick={() => handleDelete(task._id)}
                  title="Delete"
                  disabled={actionLoading}
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                </button>
              </div>

            </div>
          ))
        )}
      </div>

    </section>
  );
}

export default Projects;
