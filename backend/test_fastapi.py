from fastapi import FastAPI, Depends
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

reg_data = {
    'email': 'localdebug4@gmail.com',
    'password': 'TestPass123!',
    'full_name': 'Test Student',
    'level': 'CA Foundation',
    'attempt_date': '2026-11-15'
}
r1 = client.post('/auth/register', json=reg_data)
print('Register:', r1.status_code, r1.text)
