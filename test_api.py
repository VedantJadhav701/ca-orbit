import requests

# 1. Login to get token
url = 'https://ca-orbit.onrender.com'
login_data = {'username': 'teststudent2026@gmail.com', 'password': 'TestPass123!'}
r = requests.post(f'{url}/auth/login', data=login_data)
if r.status_code != 200:
    print('Login failed:', r.text)
    # register
    reg_data = {
        'email': 'teststudent2026@gmail.com',
        'password': 'TestPass123!',
        'full_name': 'Test Student',
        'level': 'CA Foundation',
        'attempt_date': '2026-11-15'
    }
    requests.post(f'{url}/auth/register', json=reg_data)
    r = requests.post(f'{url}/auth/login', data=login_data)

if r.status_code == 200:
    token = r.json()['access_token']
    
    # 2. Hit /planner/generate
    survey_data = {
        'level': 'CA Foundation',
        'attempt_date': '2026-11-15',
        'weakest_subject': 'Accounts',
        'study_hours': 6,
        'stress_level': 5
    }
    headers = {'Authorization': f'Bearer {token}'}
    res = requests.post(f'{url}/planner/generate', json=survey_data, headers=headers)
    print('Planner Status:', res.status_code)
    print('Planner Response:', res.text)
