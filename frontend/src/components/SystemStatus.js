import React from 'react';

const SystemStatus = ({ status, wsConnected }) => {
  if (!status) return null;

  const getStatusColor = (value, type) => {
    switch (type) {
      case 'critical':
        return value > 0 ? '#e74c3c' : '#27ae60';
      case 'high':
        return value > 0 ? '#f39c12' : '#27ae60';
      case 'system':
        return value === 'OPERATIONAL' ? '#27ae60' : '#e74c3c';
      case 'websocket':
        return value ? '#27ae60' : '#e74c3c';
      default:
        return '#2c3e50';
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>System Status</h2>
      <div style={styles.grid}>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Active Workers</h3>
          <p style={styles.cardValue}>{status.totalWorkers}</p>
        </div>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Total Alerts</h3>
          <p style={styles.cardValue}>{status.totalAlerts}</p>
        </div>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Critical Alerts</h3>
          <p style={{...styles.cardValue, color: getStatusColor(status.criticalAlerts, 'critical')}}>
            {status.criticalAlerts}
          </p>
        </div>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>High Priority</h3>
          <p style={{...styles.cardValue, color: getStatusColor(status.highAlerts, 'high')}}>
            {status.highAlerts}
          </p>
        </div>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>System Health</h3>
          <p style={{...styles.cardValue, color: getStatusColor(status.systemStatus, 'system')}}>
            {status.systemStatus}
          </p>
        </div>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>WebSocket</h3>
          <p style={{...styles.cardValue, color: getStatusColor(wsConnected, 'websocket')}}>
            {wsConnected ? 'Connected' : 'Disconnected'}
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#ffffff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    marginBottom: '2rem'
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: '600',
    marginBottom: '1.5rem',
    color: '#2c3e50'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem'
  },
  card: {
    backgroundColor: '#f8f9fa',
    padding: '1.5rem',
    borderRadius: '8px',
    textAlign: 'center',
    border: '1px solid #e0e0e0'
  },
  cardTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    margin: '0 0 0.5rem 0',
    color: '#555'
  },
  cardValue: {
    fontSize: '2rem',
    fontWeight: '700',
    margin: 0,
    color: '#2c3e50'
  }
};

export default SystemStatus;
