import React from 'react';

const AlertList = ({ alerts }) => {
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'CRITICAL':
        return '#e74c3c';
      case 'HIGH':
        return '#f39c12';
      case 'MEDIUM':
        return '#f1c40f';
      case 'LOW':
        return '#3498db';
      default:
        return '#95a5a6';
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  if (alerts.length === 0) {
    return (
      <div style={styles.emptyState}>
        <h3>No active alerts</h3>
        <p>All workers are currently safe</p>
      </div>
    );
  }

  return (
    <div>
      <h2 style={styles.title}>Real-Time Safety Alerts</h2>
      <div style={styles.alertList}>
        {alerts.map((alert) => (
          <div key={alert.alertId} style={styles.alertCard}>
            <div style={styles.alertHeader}>
              <span style={{...styles.severityBadge, backgroundColor: getSeverityColor(alert.severity)}}>
                {alert.severity}
              </span>
              <span style={styles.timestamp}>{formatTimestamp(alert.timestamp)}</span>
            </div>
            <div style={styles.alertContent}>
              <h4 style={styles.workerId}>Worker: {alert.workerId}</h4>
              <p style={styles.message}>{alert.message}</p>
              <div style={styles.alertDetails}>
                <span>Sensor: {alert.sensorId}</span>
                <span>Type: {alert.alertType}</span>
                <span>Value: {alert.triggerValue}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  title: {
    fontSize: '1.5rem',
    fontWeight: '600',
    marginBottom: '1rem',
    color: '#2c3e50'
  },
  alertList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  alertCard: {
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '1rem',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
  },
  alertHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.5rem'
  },
  severityBadge: {
    padding: '0.25rem 0.75rem',
    borderRadius: '20px',
    color: '#ffffff',
    fontSize: '0.875rem',
    fontWeight: '600'
  },
  timestamp: {
    fontSize: '0.875rem',
    color: '#666'
  },
  alertContent: {
    marginTop: '0.5rem'
  },
  workerId: {
    fontSize: '1.1rem',
    fontWeight: '600',
    margin: '0 0 0.5rem 0',
    color: '#2c3e50'
  },
  message: {
    margin: '0 0 0.5rem 0',
    color: '#555',
    lineHeight: '1.4'
  },
  alertDetails: {
    display: 'flex',
    gap: '1rem',
    fontSize: '0.875rem',
    color: '#777'
  },
  emptyState: {
    textAlign: 'center',
    padding: '3rem',
    color: '#666'
  }
};

export default AlertList;
