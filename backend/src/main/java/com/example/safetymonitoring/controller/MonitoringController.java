package com.example.safetymonitoring.controller;

import com.example.safetymonitoring.model.Alert;
import com.example.safetymonitoring.model.SensorData;
import com.example.safetymonitoring.service.SafetyAnalysisService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class MonitoringController {

    @Autowired
    private SafetyAnalysisService analysisService;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    // In-memory storage for demonstration (use database in production)
    private final List<Alert> alertHistory = new ArrayList<>();
    private final Map<String, SensorData> latestSensorData = new ConcurrentHashMap<>();
    private final Map<String, List<SensorData>> sensorDataHistory = new ConcurrentHashMap<>();

    /**
     * Endpoint to receive sensor data from IoT devices or manual input
     */
    @PostMapping("/sensor-data")
    public ResponseEntity<Map<String, Object>> receiveSensorData(@Valid @RequestBody SensorData sensorData) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Store the latest sensor data
            latestSensorData.put(sensorData.getWorkerId(), sensorData);
            
            // Store in history
            sensorDataHistory.computeIfAbsent(sensorData.getWorkerId(), k -> new ArrayList<>()).add(sensorData);
            
            // Analyze sensor data using AI service
            Alert alert = analysisService.analyzeSensorData(sensorData);
            
            if (alert != null) {
                // Save alert in history
                alertHistory.add(0, alert); // Add to beginning for latest first
                
                // Publish alert to WebSocket topic for real-time updates
                messagingTemplate.convertAndSend("/topic/alerts", alert);
                
                response.put("status", "ALERT_GENERATED");
                response.put("message", "Safety alert generated and broadcasted");
                response.put("alert", alert);
                
                return ResponseEntity.ok(response);
            } else {
                response.put("status", "DATA_PROCESSED");
                response.put("message", "Sensor data processed successfully - no alerts");
                
                return ResponseEntity.ok(response);
            }
            
        } catch (Exception e) {
            response.put("status", "ERROR");
            response.put("message", "Error processing sensor data: " + e.getMessage());
            
            return ResponseEntity.badRequest().body(response);
        }
    }

    /**
     * Get all historical alerts
     */
    @GetMapping("/alerts")
    public ResponseEntity<List<Alert>> getAlertHistory() {
        return ResponseEntity.ok(alertHistory);
    }

    /**
     * Get alerts for a specific worker
     */
    @GetMapping("/alerts/worker/{workerId}")
    public ResponseEntity<List<Alert>> getWorkerAlerts(@PathVariable String workerId) {
        List<Alert> workerAlerts = alertHistory.stream()
                .filter(alert -> alert.getWorkerId().equals(workerId))
                .toList();
        return ResponseEntity.ok(workerAlerts);
    }

    /**
     * Get latest sensor data for all workers
     */
    @GetMapping("/sensor-data/latest")
    public ResponseEntity<Map<String, SensorData>> getLatestSensorData() {
        return ResponseEntity.ok(latestSensorData);
    }

    /**
     * Get sensor data history for a specific worker
     */
    @GetMapping("/sensor-data/worker/{workerId}")
    public ResponseEntity<List<SensorData>> getWorkerSensorHistory(@PathVariable String workerId) {
        List<SensorData> history = sensorDataHistory.getOrDefault(workerId, new ArrayList<>());
        return ResponseEntity.ok(history);
    }

    /**
     * Get system status and statistics
     */
    @GetMapping("/status")
    public ResponseEntity<Map<String, Object>> getSystemStatus() {
        Map<String, Object> status = new HashMap<>();
        status.put("totalWorkers", latestSensorData.size());
        status.put("totalAlerts", alertHistory.size());
        status.put("criticalAlerts", alertHistory.stream()
                .filter(alert -> "CRITICAL".equals(alert.getSeverity()))
                .count());
        status.put("highAlerts", alertHistory.stream()
                .filter(alert -> "HIGH".equals(alert.getSeverity()))
                .count());
        status.put("systemStatus", "OPERATIONAL");
        
        return ResponseEntity.ok(status);
    }

    /**
     * Manual alert creation endpoint (for testing or manual triggers)
     */
    @PostMapping("/alerts/manual")
    public ResponseEntity<Map<String, Object>> createManualAlert(@RequestBody Alert alert) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            alertHistory.add(0, alert);
            messagingTemplate.convertAndSend("/topic/alerts", alert);
            
            response.put("status", "SUCCESS");
            response.put("message", "Manual alert created and broadcasted");
            response.put("alert", alert);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("status", "ERROR");
            response.put("message", "Error creating manual alert: " + e.getMessage());
            
            return ResponseEntity.badRequest().body(response);
        }
    }

    /**
     * Clear all alerts (for testing purposes)
     */
    @DeleteMapping("/alerts/clear")
    public ResponseEntity<Map<String, String>> clearAlerts() {
        alertHistory.clear();
        Map<String, String> response = new HashMap<>();
        response.put("status", "SUCCESS");
        response.put("message", "All alerts cleared");
        return ResponseEntity.ok(response);
    }
}
