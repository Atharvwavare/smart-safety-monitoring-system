import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AlertList from './AlertList';
import SensorDataForm from './SensorDataForm';
import SystemStatus from './SystemStatus';

const Dashboard = () => {
  const [alerts, setAlerts] = useState([]);
  const [systemStatus, setSystemStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wsConnected, setWsConnected] = useState(false);

  useEffect(() => {
    fetchInitialData();
    setupWebSocket();
  }, []);

  const fetchInitialData = async () => {
    try {
      const [alertsResponse, statusResponse] = await Promise.all([
        axios.get('/api/alerts'),
        axios.get('/api/status')
      ]);
      
      setAlerts(alertsResponse.data);
      setSystemStatus(statusResponse.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch initial data');
      setLoading(false);
    }
  };

  const setupWebSocket = () => {
    const ws = new WebSocket('ws://localhost:8080/ws-alerts');
    
    ws.onopen = () => {
      console.log('WebSocket connected');
      setWsConnected(true);
    };

    ws.onmessage = (event) => {
      const newAlert = JSON.parse(event.data);
      setAlerts(prevAlerts => [newAlert, ...prevAlerts]);
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
      setWsConnected(false);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setWsConnected(false);
    };

    return () => {
      ws.close();
    };
  };

  const handleNewAlert = (alert) => {
    setAlerts(prevAlerts => [alert, ...prevAlerts]);
  };

  if (loading) {
    return <div style={styles.loading}>Loading safety monitoring data...</div>;
  }

  if (error) {
    return <div style={styles.error}>{error}</div>;
  }

  return (
    <div style={styles.container}>
      <SystemStatus status={systemStatus} wsConnected={wsConnected} />
      <div style={styles.content}>
        <div style={styles.leftPanel}>
          <SensorDataForm onAlertGenerated={handleNewAlert} />
        </div>
        <div style={styles.rightPanel}>
          <AlertList alerts={alerts} />
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 20px'
  },
  loading: {
    textAlign: 'center',
    padding: '2rem',
    fontSize: '1.2rem',
    color: '#666'
  },
  error: {
    textAlign: 'center',
    padding: '2rem',
    fontSize: '1.2rem',
    color: '#e74c3c'
  },
  content: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gap: '2rem',
    marginTop: '2rem'
  },
  leftPanel: {
    backgroundColor: '#f8f9fa',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
  },
  rightPanel: {
    backgroundColor: '#ffffff',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
  }
};

export default Dashboard;
