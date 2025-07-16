import React, { useState } from 'react';
import axios from 'axios';

const SensorDataForm = ({ onAlertGenerated }) => {
  const [formData, setFormData] = useState({
    sensorId: '',
    workerId: '',
    metricValue: '',
    metricType: 'temperature'
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await axios.post('/api/sensor-data', {
        ...formData,
        metricValue: parseFloat(formData.metricValue)
      });

      setResult(response.data);
      
      if (response.data.alert) {
        onAlertGenerated(response.data.alert);
      }

      // Reset form
      setFormData({
        sensorId: '',
        workerId: '',
        metricValue: '',
        metricType: 'temperature'
      });
    } catch (error) {
      setResult({
        status: 'ERROR',
        message: error.response?.data?.message || 'Failed to submit sensor data'
      });
    } finally {
      setLoading(false);
    }
  };

  const metricTypes = [
    { value: 'temperature', label: 'Temperature (°C)' },
    { value: 'gas', label: 'Gas Level (PPM)' },
    { value: 'noise', label: 'Noise Level (dB)' },
    { value: 'heartrate', label: 'Heart Rate (BPM)' },
    { value: 'oxygen', label: 'Oxygen Level (%)' }
  ];

  return (
    <div>
      <h3 style={styles.title}>Submit Sensor Data</h3>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Sensor ID:</label>
          <input
            type="text"
            name="sensorId"
            value={formData.sensorId}
            onChange={handleChange}
            required
            style={styles.input}
            placeholder="e.g., SENSOR-001"
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Worker ID:</label>
          <input
            type="text"
            name="workerId"
            value={formData.workerId}
            onChange={handleChange}
            required
            style={styles.input}
            placeholder="e.g., WORKER-123"
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Metric Type:</label>
          <select
            name="metricType"
            value={formData.metricType}
            onChange={handleChange}
            style={styles.select}
          >
            {metricTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Value:</label>
          <input
            type="number"
            name="metricValue"
            value={formData.metricValue}
            onChange={handleChange}
            required
            step="0.1"
            style={styles.input}
            placeholder="Enter value"
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          style={{
            ...styles.button,
            ...(loading ? styles.buttonDisabled : {})
          }}
        >
          {loading ? 'Processing...' : 'Submit Data'}
        </button>

        {result && (
          <div style={{
            ...styles.result,
            ...(result.status === 'ERROR' ? styles.error : styles.success)
          }}>
            {result.message}
          </div>
        )}
      </form>

      <div style={styles.info}>
  <h4>AI Safety Thresholds:</h4>
  <ul style={styles.list}>
    <li>Temperature: &gt;45°C (HIGH), &gt;55°C (CRITICAL)</li>
    <li>Gas Level: &gt;50 PPM (HIGH), &gt;100 PPM (CRITICAL)</li>
    <li>Noise: &gt;85 dB (HIGH), &gt;100 dB (CRITICAL)</li>
    <li>Heart Rate: &lt;60 or &gt;100 BPM</li>
    <li>Oxygen: &lt;95% (HIGH), &lt;90% (CRITICAL)</li>
  </ul>
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
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column'
  },
  label: {
    fontWeight: '600',
    marginBottom: '0.5rem',
    color: '#2c3e50'
  },
  input: {
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem'
  },
  select: {
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem'
  },
  button: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#3498db',
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s'
  },
  buttonDisabled: {
    backgroundColor: '#bdc3c7',
    cursor: 'not-allowed'
  },
  result: {
    padding: '1rem',
    borderRadius: '4px',
    marginTop: '1rem'
  },
  success: {
    backgroundColor: '#d5f4e6',
    color: '#27ae60',
    border: '1px solid #27ae60'
  },
  error: {
    backgroundColor: '#fadbd8',
    color: '#e74c3c',
    border: '1px solid #e74c3c'
  },
  info: {
    marginTop: '2rem',
    padding: '1rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '4px'
  },
  list: {
    margin: '0.5rem 0',
    paddingLeft: '1.5rem',
    fontSize: '0.875rem',
    color: '#555'
  }
};

export default SensorDataForm;
