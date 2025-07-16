#!/bin/bash

echo "🚀 Starting Smart Safety Monitoring System..."
echo "=========================================="

# Function to check if port is in use
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null 2>&1; then
        echo "❌ Port $1 is already in use"
        return 1
    fi
    return 0
}

# Function to kill process on port
kill_port() {
    PID=$(lsof -ti:$1)
    if [ ! -z "$PID" ]; then
        echo "🔴 Killing process on port $1 (PID: $PID)"
        kill -9 $PID
    fi
}

# Check ports
echo "🔍 Checking ports..."
check_port 8080 || kill_port 8080
check_port 3000 || kill_port 3000

# Wait a moment for ports to be freed
sleep 2

# Start backend
echo "📦 Starting Backend (Spring Boot)..."
cd backend
mvn clean compile -q &
BACKEND_PID=$!
sleep 10

# Start backend server
mvn spring-boot:run -q &
BACKEND_SERVER_PID=$!
cd ..

# Wait for backend to start
echo "⏳ Waiting for backend to start..."
sleep 15

# Start frontend
echo "⚛️ Starting Frontend (React)..."
cd frontend
npm install --silent
npm start &
FRONTEND_PID=$!
cd ..

echo ""
echo "✅ System started successfully!"
echo ""
echo "📊 Frontend: http://localhost:3000"
echo "🔧 Backend API: http://localhost:8080"
echo "📡 WebSocket: ws://localhost:8080/ws-alerts"
echo ""
echo "🛑 To stop all services, run: ./stop-system.sh"
echo ""

# Function to stop all services on exit
trap "echo 'Stopping all services...'; kill $BACKEND_PID $BACKEND_SERVER_PID $FRONTEND_PID 2>/dev/null; exit" INT TERM

# Keep script running
wait
