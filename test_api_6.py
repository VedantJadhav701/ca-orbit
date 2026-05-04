import requests
import json
import time

url = 'https://ca-orbit.onrender.com'
email = f'debug_{int(time.time())}@gmail.com'

# 1. Register
reg_data = {
    'email': email,
    'password': 'TestPass123!',
    'full_name': 'Test Student',
    'level': 'CA Foundation',
    'attempt_date': '2026-11-15'
}
r1 = requests.post(f'{url}/auth/register', json=reg_data)
print('Register Status:', r1.status_code)
print('Register Response:', r1.text[:200])

if r1.status_code == 200:
    # 2. Login
    login_data = {'username': email, 'password': 'TestPass123!'}
    r2 = requests.post(f'{url}/auth/login', data=login_data)
    print('Login Status:', r2.status_code)
    print('Login Response:', r2.text[:200])

    if r2.status_code == 200:
        token = r2.json()['access_token']
        
        # 3. Survey
        survey_data = {
            'level': 'CA Foundation',
            'attempt_date': '2026-11-15',
            'weakest_subject': 'Accounts',
            'study_hours': 6,
            'stress_level': 5
        }
        headers = {'Authorization': f'Bearer {token}'}
        r3 = requests.post(f'{url}/planner/generate', json=survey_data, headers=headers)
        print('Planner Status:', r3.status_code)
        print('Planner Response:', r3.text[:500])
