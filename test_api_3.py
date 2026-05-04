import requests

url = 'https://ca-orbit.onrender.com'
# Register
reg_data = {
    'email': 'debug2026_x1@gmail.com',
    'password': 'TestPass123!',
    'full_name': 'Test Student',
    'level': 'CA Foundation',
    'attempt_date': '2026-11-15'
}
r1 = requests.post(f'{url}/auth/register', json=reg_data)
print('Register:', r1.status_code, r1.text)

login_data = {'username': 'debug2026_x1@gmail.com', 'password': 'TestPass123!'}
r2 = requests.post(f'{url}/auth/login', data=login_data)

if r2.status_code == 200:
    token = r2.json()['access_token']
    
    # Hit /planner/generate
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
else:
    print('Login Status:', r2.status_code)
    print('Login Response:', r2.text)
