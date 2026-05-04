import requests
import time

url = 'https://ca-orbit.onrender.com'
email = f'debug_long_{int(time.time())}@gmail.com'

reg_data = {
    'email': email,
    'password': 'a' * 75,
    'full_name': 'Test Student',
    'level': 'CA Foundation',
    'attempt_date': '2026-11-15'
}
r1 = requests.post(f'{url}/auth/register', json=reg_data)
print('Register Status:', r1.status_code)
print('Register Response:', r1.text[:500])
