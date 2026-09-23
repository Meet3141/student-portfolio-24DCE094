import React, { useState } from 'react';

export default function TaskForm({ onTaskCreated, isSubmitting }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [showDesc, setShowDesc] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please enter a task title');
      return;
    }
    setError('');

    const success = await onTaskCreated({
      title: title.trim(),
      description: description.trim(),
      completed: false,
    });

    if (success) {
      setTitle('');
      setDescription('');
      setShowDesc(false);
    }
  };

  return (
    <div className="card tm-form-card" style={{ marginBottom: '20px' }}>
      <form onSubmit={handleSubmit} className="simple-form">
        <input
          type="text"
          className="form-input tm-input-main"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (error) setError('');
          }}
          disabled={isSubmitting}
          style={{ width: '100%', padding: '12px', border: '1px solid #e5e7eb', borderRadius: '6px', marginBottom: '10px' }}
        />

        {error && (
          <div style={{ color: 'var(--danger, #dc2626)', fontSize: '0.8rem', marginBottom: '10px' }}>
            {error}
          </div>
        )}

        {showDesc ? (
          <textarea
            className="form-textarea tm-input-notes"
            placeholder="Add details / notes (optional)..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isSubmitting}
            style={{ width: '100%', padding: '12px', border: '1px solid #e5e7eb', borderRadius: '6px', marginBottom: '10px' }}
          />
        ) : null}

        <div className="form-actions tm-form-actions" style={{ display: 'flex', justifyContent: 'space-between' }}>
          {!showDesc ? (
            <button
              type="button"
              className="btn btn-secondary tm-btn-ghost"
              style={{ fontSize: '0.8rem', padding: '0.4rem 0.75rem', background: 'transparent', border: 'none', cursor: 'pointer', color: '#6b7280' }}
              onClick={() => setShowDesc(true)}
            >
              + Add notes
            </button>
          ) : <div />}

          <button
            type="submit"
            className="btn btn-primary tm-btn-primary"
            disabled={isSubmitting}
            style={{ background: '#111827', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer' }}
          >
            {isSubmitting ? 'Adding...' : 'Add Task'}
          </button>
        </div>
      </form>
    </div>
  );
}
