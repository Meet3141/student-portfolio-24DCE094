import React from 'react';
import { CheckCircle2, Clock, ListTodo, TrendingUp } from 'lucide-react';

export default function TaskStats({ tasks = [] }) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;
  const rate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px', marginBottom: '25px' }}>
      <div className="stat-card" style={{ background: '#fff', padding: '15px', borderRadius: '10px', border: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.02)' }}>
        <div className="stat-info">
          <h4 style={{ margin: 0, fontSize: '13px', color: '#6b7280', fontWeight: 500 }}>Total Tasks</h4>
          <div className="stat-number" style={{ fontSize: '24px', fontWeight: 700, color: '#111827' }}>{total}</div>
        </div>
        <div style={{ color: '#3b82f6', background: '#eff6ff', padding: '10px', borderRadius: '50%' }}>
          <ListTodo size={22} />
        </div>
      </div>

      <div className="stat-card" style={{ background: '#fff', padding: '15px', borderRadius: '10px', border: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.02)' }}>
        <div className="stat-info">
          <h4 style={{ margin: 0, fontSize: '13px', color: '#6b7280', fontWeight: 500 }}>Completed</h4>
          <div className="stat-number" style={{ fontSize: '24px', fontWeight: 700, color: '#111827' }}>{completed}</div>
        </div>
        <div style={{ color: '#10b981', background: '#ecfdf5', padding: '10px', borderRadius: '50%' }}>
          <CheckCircle2 size={22} />
        </div>
      </div>

      <div className="stat-card" style={{ background: '#fff', padding: '15px', borderRadius: '10px', border: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.02)' }}>
        <div className="stat-info">
          <h4 style={{ margin: 0, fontSize: '13px', color: '#6b7280', fontWeight: 500 }}>Pending</h4>
          <div className="stat-number" style={{ fontSize: '24px', fontWeight: 700, color: '#111827' }}>{pending}</div>
        </div>
        <div style={{ color: '#f59e0b', background: '#fffbeb', padding: '10px', borderRadius: '50%' }}>
          <Clock size={22} />
        </div>
      </div>

      <div className="stat-card" style={{ background: '#fff', padding: '15px', borderRadius: '10px', border: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.02)' }}>
        <div className="stat-info">
          <h4 style={{ margin: 0, fontSize: '13px', color: '#6b7280', fontWeight: 500 }}>Progress</h4>
          <div className="stat-number" style={{ fontSize: '24px', fontWeight: 700, color: '#111827' }}>{rate}%</div>
        </div>
        <div style={{ color: '#8b5cf6', background: '#f5f3ff', padding: '10px', borderRadius: '50%' }}>
          <TrendingUp size={22} />
        </div>
      </div>
    </div>
  );
}
