#!/bin/bash

# Target Virtual Machine Public IP
VM_IP="34.10.121.99"

echo "Starting Eventify deployment for IP: $VM_IP"

# 1. Required environment variables
export VITE_API_BASE_URL="http://${VM_IP}:3000"
export CORS_ORIGIN="http://${VM_IP},http://${VM_IP}:80,http://127.0.0.1,http://localhost"

echo "VITE_API_BASE_URL: $VITE_API_BASE_URL"
echo "CORS_ORIGIN: $CORS_ORIGIN"

# 2. Build and start containers with Docker Compose
docker compose up -d --build

echo "Deployment completed successfully."
echo "Frontend accessible at: http://${VM_IP}"
echo "Backend API accessible at: http://${VM_IP}:3000/api"

