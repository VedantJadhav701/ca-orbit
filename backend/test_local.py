import requests
reg_data = {
    'email': 'localdebug3@gmail.com',
    'password': 'TestPass123!',
    'full_name': 'Test Student',
    'level': 'CA Foundation',
    'attempt_date': '2026-11-15'
}
r1 = requests.post('http://127.0.0.1:8000/auth/register', json=reg_data)
print('Register:', r1.status_code, r1.text)
