from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

reg_data = {
    'email': 'localdebug5@gmail.com',
    'password': 'TestPass123!',
    'full_name': 'Test Student',
    'level': 'CA Foundation',
    'attempt_date': '2026-11-15'
}
r1 = client.post('/auth/register', json=reg_data)
print('Register:', r1.status_code, r1.text)

if r1.status_code == 200:
    login_data = {'username': 'localdebug5@gmail.com', 'password': 'TestPass123!'}
    r2 = client.post('/auth/login', data=login_data)
    print('Login:', r2.status_code)
    token = r2.json()['access_token']
    
    survey_data = {
        'level': 'CA Foundation',
        'attempt_date': '2026-11-15',
        'weakest_subject': 'Accounts',
        'study_hours': 6,
        'stress_level': 5
    }
    headers = {'Authorization': f'Bearer {token}'}
    r3 = client.post('/planner/generate', json=survey_data, headers=headers)
    print('Planner Status:', r3.status_code)
    print('Planner Response:', r3.text[:100])
