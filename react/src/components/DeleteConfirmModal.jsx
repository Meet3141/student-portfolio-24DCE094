import React from 'react';

export default function DeleteConfirmModal({
  isOpen,
  taskTitle,
  onConfirm,
  onCancel,
  isDeleting,
}) {
  if (!isOpen) return null;

  const modalStyle = {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
  };
  const contentStyle = {
    background: 'white', padding: '24px', borderRadius: '12px', width: '100%', maxWidth: '380px',
    boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'
  };

  return (
    <div className="modal-overlay" style={modalStyle} onClick={onCancel}>
      <div className="modal-content" style={contentStyle} onClick={(e) => e.stopPropagation()}>
        <h3 style={{ margin: 0, fontSize: '18px', marginBottom: '8px' }}>
          Delete Task
        </h3>
        <p style={{ fontSize: '14px', color: '#6b7280', margin: '0 0 20px 0' }}>
          Are you sure you want to delete "{taskTitle}"?
        </p>

        <div className="modal-footer" style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
            disabled={isDeleting}
            style={{ padding: '8px 16px', background: 'transparent', border: '1px solid #e5e7eb', borderRadius: '6px', cursor: 'pointer' }}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={onConfirm}
            disabled={isDeleting}
            style={{ padding: '8px 16px', background: '#dc2626', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}
