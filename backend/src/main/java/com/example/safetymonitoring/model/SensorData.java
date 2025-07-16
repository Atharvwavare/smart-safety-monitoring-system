package com.example.safetymonitoring.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

public class SensorData {
    @NotBlank(message = "Sensor ID is required")
    private String sensorId;
    
    @NotBlank(message = "Worker ID is required")
    private String workerId;
    
    @NotNull(message = "Metric value is required")
    private Double metricValue;
    
    private String metricType;
    private LocalDateTime timestamp;

    public SensorData() {
        this.timestamp = LocalDateTime.now();
    }

    public SensorData(String sensorId, String workerId, Double metricValue, String metricType) {
        this.sensorId = sensorId;
        this.workerId = workerId;
        this.metricValue = metricValue;
        this.metricType = metricType;
        this.timestamp = LocalDateTime.now();
    }

    // Getters and Setters
    public String getSensorId() {
        return sensorId;
    }

    public void setSensorId(String sensorId) {
        this.sensorId = sensorId;
    }

    public String getWorkerId() {
        return workerId;
    }

    public void setWorkerId(String workerId) {
        this.workerId = workerId;
    }

    public Double getMetricValue() {
        return metricValue;
    }

    public void setMetricValue(Double metricValue) {
        this.metricValue = metricValue;
    }

    public String getMetricType() {
        return metricType;
    }

    public void setMetricType(String metricType) {
        this.metricType = metricType;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    @Override
    public String toString() {
        return "SensorData{" +
                "sensorId='" + sensorId + '\'' +
                ", workerId='" + workerId + '\'' +
                ", metricValue=" + metricValue +
                ", metricType='" + metricType + '\'' +
                ", timestamp=" + timestamp +
                '}';
    }
}
