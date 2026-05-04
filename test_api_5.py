import requests

url = 'https://ca-orbit.onrender.com'
login_data = {'username': 'localdebug5@gmail.com', 'password': 'TestPass123!'}
r = requests.post(f'{url}/auth/login', data=login_data)

if r.status_code == 200:
    token = r.json()['access_token']
    
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
    print('Planner Response:', res.text[:200])
else:
    print('Login Status:', r.status_code)
    print('Login Response:', r.text)
