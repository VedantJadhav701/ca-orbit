import psycopg2
try:
    conn = psycopg2.connect(user='postgres', password='password', host='localhost')
    conn.autocommit = True
    cur = conn.cursor()
    cur.execute('CREATE DATABASE caorbit')
    print("Database caorbit created successfully")
    cur.close()
    conn.close()
except Exception as e:
    print(f"Error: {e}")
