package com.example.safetymonitoring.service;

import com.example.safetymonitoring.model.Alert;
import com.example.safetymonitoring.model.SensorData;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class SafetyAnalysisService {

    // AI-powered safety analysis thresholds and rules
    private static final double TEMPERATURE_THRESHOLD = 45.0; // Celsius
    private static final double GAS_LEVEL_THRESHOLD = 50.0; // PPM
    private static final double NOISE_LEVEL_THRESHOLD = 85.0; // Decibels
    private static final double HEART_RATE_MIN = 60.0;
    private static final double HEART_RATE_MAX = 100.0;
    private static final double OXYGEN_LEVEL_MIN = 95.0; // Percentage

    /**
     * AI-powered analysis of sensor data to determine safety risks
     * This simulates advanced AI algorithms for real-time safety monitoring
     */
    public Alert analyzeSensorData(SensorData data) {
        String metricType = data.getMetricType() != null ? data.getMetricType().toLowerCase() : "unknown";
        double value = data.getMetricValue();
        
        Alert alert = null;
        
        switch (metricType) {
            case "temperature":
                alert = analyzeTemperature(data, value);
                break;
            case "gas":
                alert = analyzeGasLevel(data, value);
                break;
            case "noise":
                alert = analyzeNoiseLevel(data, value);
                break;
            case "heartrate":
                alert = analyzeHeartRate(data, value);
                break;
            case "oxygen":
                alert = analyzeOxygenLevel(data, value);
                break;
            default:
                // Generic threshold analysis for unknown metrics
                alert = analyzeGenericMetric(data, value);
                break;
        }
        
        return alert;
    }

    private Alert analyzeTemperature(SensorData data, double temperature) {
        if (temperature > TEMPERATURE_THRESHOLD) {
            String severity = temperature > TEMPERATURE_THRESHOLD + 10 ? "CRITICAL" : "HIGH";
            return createAlert(data, 
                "High temperature detected: " + temperature + "°C. Worker safety at risk!",
                severity, "TEMPERATURE_ALERT", temperature);
        }
        return null;
    }

    private Alert analyzeGasLevel(SensorData data, double gasLevel) {
        if (gasLevel > GAS_LEVEL_THRESHOLD) {
            String severity = gasLevel > GAS_LEVEL_THRESHOLD * 2 ? "CRITICAL" : "HIGH";
            return createAlert(data,
                "Dangerous gas level detected: " + gasLevel + " PPM. Immediate evacuation required!",
                severity, "GAS_ALERT", gasLevel);
        }
        return null;
    }

    private Alert analyzeNoiseLevel(SensorData data, double noiseLevel) {
        if (noiseLevel > NOISE_LEVEL_THRESHOLD) {
            String severity = noiseLevel > NOISE_LEVEL_THRESHOLD + 15 ? "HIGH" : "MEDIUM";
            return createAlert(data,
                "Excessive noise level: " + noiseLevel + " dB. Hearing protection required!",
                severity, "NOISE_ALERT", noiseLevel);
        }
        return null;
    }

    private Alert analyzeHeartRate(SensorData data, double heartRate) {
        if (heartRate < HEART_RATE_MIN || heartRate > HEART_RATE_MAX) {
            String severity = (heartRate < 50 || heartRate > 120) ? "CRITICAL" : "HIGH";
            String message = heartRate < HEART_RATE_MIN ? 
                "Low heart rate detected: " + heartRate + " BPM. Medical attention needed!" :
                "High heart rate detected: " + heartRate + " BPM. Worker may be in distress!";
            return createAlert(data, message, severity, "HEALTH_ALERT", heartRate);
        }
        return null;
    }

    private Alert analyzeOxygenLevel(SensorData data, double oxygenLevel) {
        if (oxygenLevel < OXYGEN_LEVEL_MIN) {
            String severity = oxygenLevel < 90 ? "CRITICAL" : "HIGH";
            return createAlert(data,
                "Low oxygen saturation: " + oxygenLevel + "%. Immediate medical attention required!",
                severity, "HEALTH_ALERT", oxygenLevel);
        }
        return null;
    }

    private Alert analyzeGenericMetric(SensorData data, double value) {
        // Generic AI analysis for unknown metrics
        if (value > 75.0) { // Generic threshold
            String severity = value > 90.0 ? "HIGH" : "MEDIUM";
            return createAlert(data,
                "Safety threshold exceeded for " + data.getMetricType() + ": " + value,
                severity, "GENERIC_ALERT", value);
        }
        return null;
    }

    private Alert createAlert(SensorData data, String message, String severity, String alertType, double triggerValue) {
        return new Alert(
            UUID.randomUUID().toString(),
            data.getWorkerId(),
            data.getSensorId(),
            message,
            severity,
            alertType,
            triggerValue
        );
    }

    /**
     * Advanced AI pattern recognition for multiple sensor correlation
     * This would integrate with actual AI/ML models in production
     */
    public boolean detectAnomalousPattern(SensorData[] recentData) {
        // Placeholder for advanced AI pattern detection
        // In production, this would use ML models to detect complex patterns
        return false;
    }
}
