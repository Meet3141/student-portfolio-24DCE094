import React from 'react';
import { AlertCircle, CheckCircle, X } from 'lucide-react';

export default function AlertBanner({ type = 'danger', message, onDismiss }) {
  if (!message) return null;

  const isSuccess = type === 'success';

  return (
    <div 
      className={`alert ${isSuccess ? 'alert-success' : 'alert-danger'}`}
      style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '12px 16px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px',
        background: isSuccess ? '#ecfdf5' : '#fef2f2',
        color: isSuccess ? '#065f46' : '#991b1b',
        border: `1px solid ${isSuccess ? '#34d399' : '#f87171'}`
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {isSuccess ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
        <span>{message}</span>
      </div>
      {onDismiss && (
        <button
          type="button"
          className="btn-icon"
          onClick={onDismiss}
          style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', color: 'inherit' }}
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
