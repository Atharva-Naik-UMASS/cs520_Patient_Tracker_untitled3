import os
import psycopg2
from flask import Flask, render_template

app = Flask(__name__)
print("flask")


def get_db_connection():
    conn = psycopg2.connect(host='localhost',
                            port="5432",
                            database='PatientTracker',
                            user=os.environ['postgres'],
                            password=os.environ['untitled3'])
    print(conn)
    return conn


@app.route('/')
def index():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM public.employee;')
    employees = cur.fetchall()
    cur.close()
    conn.close()
    return render_template('index.html', employees=employees)
