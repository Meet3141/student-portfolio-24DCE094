import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';

export default function TaskCard({
  task,
  onToggleStatus,
  onEdit,
  onDelete,
  isProcessing,
}) {
  const { _id, title, description, completed } = task;

  return (
    <div className={`task-item tm-card ${completed ? 'is-done' : ''}`} style={{ display: 'flex', alignItems: 'center', background: '#fff', border: '1px solid #f1f5f9', borderRadius: '10px', padding: '16px', marginBottom: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
      <input
        type="checkbox"
        className="task-checkbox"
        checked={completed}
        onChange={() => onToggleStatus(task)}
        disabled={isProcessing}
        title={completed ? 'Mark as pending' : 'Mark as completed'}
        style={{ marginRight: '16px', width: '18px', height: '18px', accentColor: '#111827', cursor: 'pointer' }}
      />

      <div className="task-content tm-card-content" style={{ flex: 1 }}>
        <div className={`task-title tm-card-title ${completed ? 'done' : ''}`} style={{ margin: 0, fontWeight: 600, fontSize: '15px', color: completed ? '#9ca3af' : '#111827', textDecoration: completed ? 'line-through' : 'none' }}>
          {title}
        </div>
        {description && <div className="task-desc tm-card-desc" style={{ fontSize: '13px', color: '#6b7280', marginTop: '4px' }}>{description}</div>}
      </div>

      <div className="task-actions tm-card-actions" style={{ display: 'flex', gap: '8px', marginLeft: '16px' }}>
        <button
          type="button"
          className="btn-icon tm-icon-btn"
          onClick={() => onEdit(task)}
          disabled={isProcessing}
          title="Edit"
          style={{ background: 'transparent', border: 'none', color: '#6b7280', cursor: 'pointer', padding: '6px' }}
        >
          <Edit2 size={16} />
        </button>
        <button
          type="button"
          className="btn-icon delete-btn tm-icon-btn delete"
          onClick={() => onDelete(task)}
          disabled={isProcessing}
          title="Delete"
          style={{ background: 'transparent', border: 'none', color: '#dc2626', cursor: 'pointer', padding: '6px' }}
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}
