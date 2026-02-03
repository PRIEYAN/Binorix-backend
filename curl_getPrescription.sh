#!/bin/bash

# Curl command to test getPrescription endpoint
# Replace YOUR_JWT_TOKEN with the actual JWT token from patient login
# Replace PATIENT_PHONE_NUMBER with the patient's phone number

curl -X POST http://localhost:5050/doctor/prescription/getPrescription \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "PhoneNumber": "PATIENT_PHONE_NUMBER"
  }'
