import psycopg2
try:
    conn = psycopg2.connect(user='postgres', password='password', host='localhost')
    cur = conn.cursor()
    cur.execute('SELECT datname FROM pg_database')
    dbs = cur.fetchall()
    print("Databases:", [db[0] for db in dbs])
    cur.close()
    conn.close()
except Exception as e:
    print(f"Error: {e}")
