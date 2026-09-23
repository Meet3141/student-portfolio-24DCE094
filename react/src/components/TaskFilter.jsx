import React from 'react';

export default function TaskFilter({
  filter,
  onFilterChange,
  counts,
}) {
  return (
    <div className="filter-bar tm-toolbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid #e5e7eb', paddingBottom: '8px' }}>
      <div className="filter-group tm-tabs" style={{ display: 'flex', gap: '16px' }}>
        <button
          type="button"
          className={`filter-btn tm-tab ${filter === 'all' ? 'active' : ''}`}
          onClick={() => onFilterChange('all')}
          style={{ background: 'transparent', border: 'none', borderBottom: filter === 'all' ? '2px solid #111827' : '2px solid transparent', color: filter === 'all' ? '#111827' : '#6b7280', padding: '4px 0', cursor: 'pointer', fontWeight: 500 }}
        >
          All ({counts.all})
        </button>
        <button
          type="button"
          className={`filter-btn tm-tab ${filter === 'active' ? 'active' : ''}`}
          onClick={() => onFilterChange('active')}
          style={{ background: 'transparent', border: 'none', borderBottom: filter === 'active' ? '2px solid #111827' : '2px solid transparent', color: filter === 'active' ? '#111827' : '#6b7280', padding: '4px 0', cursor: 'pointer', fontWeight: 500 }}
        >
          Active ({counts.active})
        </button>
        <button
          type="button"
          className={`filter-btn tm-tab ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => onFilterChange('completed')}
          style={{ background: 'transparent', border: 'none', borderBottom: filter === 'completed' ? '2px solid #111827' : '2px solid transparent', color: filter === 'completed' ? '#111827' : '#6b7280', padding: '4px 0', cursor: 'pointer', fontWeight: 500 }}
        >
          Completed ({counts.completed})
        </button>
      </div>

      <span className="tm-stats" style={{ fontSize: '0.8rem', color: '#9ca3af' }}>
        {counts.completed} of {counts.all} completed
      </span>
    </div>
  );
}
