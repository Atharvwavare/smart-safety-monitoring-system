package com.example.safetymonitoring.model;

import java.time.LocalDateTime;

public class Alert {
    private String alertId;
    private String workerId;
    private String sensorId;
    private String message;
    private String severity;
    private String alertType;
    private Double triggerValue;
    private LocalDateTime timestamp;

    public Alert() {
        this.timestamp = LocalDateTime.now();
    }

    public Alert(String alertId, String workerId, String sensorId, String message, String severity, String alertType, Double triggerValue) {
        this.alertId = alertId;
        this.workerId = workerId;
        this.sensorId = sensorId;
        this.message = message;
        this.severity = severity;
        this.alertType = alertType;
        this.triggerValue = triggerValue;
        this.timestamp = LocalDateTime.now();
    }

    // Getters and Setters
    public String getAlertId() {
        return alertId;
    }

    public void setAlertId(String alertId) {
        this.alertId = alertId;
    }

    public String getWorkerId() {
        return workerId;
    }

    public void setWorkerId(String workerId) {
        this.workerId = workerId;
    }

    public String getSensorId() {
        return sensorId;
    }

    public void setSensorId(String sensorId) {
        this.sensorId = sensorId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getSeverity() {
        return severity;
    }

    public void setSeverity(String severity) {
        this.severity = severity;
    }

    public String getAlertType() {
        return alertType;
    }

    public void setAlertType(String alertType) {
        this.alertType = alertType;
    }

    public Double getTriggerValue() {
        return triggerValue;
    }

    public void setTriggerValue(Double triggerValue) {
        this.triggerValue = triggerValue;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    @Override
    public String toString() {
        return "Alert{" +
                "alertId='" + alertId + '\'' +
                ", workerId='" + workerId + '\'' +
                ", sensorId='" + sensorId + '\'' +
                ", message='" + message + '\'' +
                ", severity='" + severity + '\'' +
                ", alertType='" + alertType + '\'' +
                ", triggerValue=" + triggerValue +
                ", timestamp=" + timestamp +
                '}';
    }
}
