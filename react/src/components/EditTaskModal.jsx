import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function EditTaskModal({ task, isOpen, onClose, onUpdate, isUpdating }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title || '');
      setDescription(task.description || '');
      setError('');
    }
  }, [task]);

  if (!isOpen || !task) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title cannot be empty');
      return;
    }

    const success = await onUpdate(task._id, {
      title: title.trim(),
      description: description.trim(),
      completed: task.completed,
    });

    if (success) {
      onClose();
    }
  };

  const modalStyle = {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
  };
  const contentStyle = {
    background: 'white', padding: '24px', borderRadius: '12px', width: '100%', maxWidth: '400px',
    boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'
  };

  return (
    <div className="modal-overlay" style={modalStyle} onClick={onClose}>
      <div className="modal-content" style={contentStyle} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ margin: 0, fontSize: '18px' }}>Edit Task</h3>
          <button type="button" className="btn-icon" onClick={onClose} disabled={isUpdating} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="simple-form">
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#6b7280', marginBottom: '6px' }}>Title</label>
            <input
              type="text"
              className="form-input"
              value={title}
              onChange={(e) => { setTitle(e.target.value); if (error) setError(''); }}
              disabled={isUpdating}
              style={{ width: '100%', padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px', boxSizing: 'border-box' }}
            />
            {error && <p style={{ color: '#dc2626', fontSize: '12px', margin: '4px 0 0 0' }}>{error}</p>}
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#6b7280', marginBottom: '6px' }}>Notes</label>
            <textarea
              className="form-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isUpdating}
              style={{ width: '100%', padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px', minHeight: '80px', boxSizing: 'border-box' }}
            />
          </div>

          <div className="modal-footer" style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={isUpdating} style={{ padding: '8px 16px', background: 'transparent', border: '1px solid #e5e7eb', borderRadius: '6px', cursor: 'pointer' }}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={isUpdating} style={{ padding: '8px 16px', background: '#111827', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
              {isUpdating ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
