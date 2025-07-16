import React from 'react';

const Header = () => {
  return (
    <header style={styles.header}>
      <h1 style={styles.title}>Smart Real-Time Safety Monitoring Dashboard</h1>
      <p style={styles.subtitle}>AI-Powered Industrial Worker Safety System</p>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: '#1a1a1a',
    color: '#ffffff',
    padding: '2rem',
    textAlign: 'center',
    marginBottom: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: '700',
    margin: '0 0 0.5rem 0',
    fontFamily: 'Inter, sans-serif'
  },
  subtitle: {
    fontSize: '1.2rem',
    margin: '0',
    opacity: '0.8',
    fontFamily: 'Inter, sans-serif'
  }
};

export default Header;
