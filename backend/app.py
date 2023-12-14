import os

import flask
import psycopg2
from flask import Flask, request
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app, origins="http://localhost:3000")


def get_db_connection():
    print("flask")
    conn = psycopg2.connect(host='localhost',
                            port="5432",
                            database='PatientTracker',
                            user="postgres",
                            password="untitled3")
    print(conn)
    return conn


@app.route('/')
def welcome():
    return "Welcome!"


@app.route('/get_all_employees')
def get_all_employees():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM public.employee;')
    employees = cur.fetchall()
    cur.close()
    conn.close()
    print(employees)
    return employees, 200


@app.route('/add_employee', methods=['POST'])
def add_employee():
    conn = get_db_connection()
    cur = conn.cursor()
    try:
        # Get the data from the form
        job_id = request.form['job_id']
        emp_phno = request.form['emp_phno']
        emp_emergency_contact = request.form['emp_emergency_contact']
        emp_password = request.form['emp_password']
        emp_email = request.form['emp_email']

        # Insert the data into the table
        emp = cur.execute(
            '''INSERT INTO employee
            (job_id, emp_phno, emp_emergency_contact, emp_password, emp_email) VALUES (%s, %s, %s, %s, %s)''',
            (job_id, emp_phno, emp_emergency_contact, emp_password, emp_email))

        print(emp)

        # commit the changes
        conn.commit()
        # close the cursor and connection
        cur.close()
        conn.close()
        return "Employee added successfully", 200
    except:
        # close the cursor and connection
        cur.close()
        conn.close()
        return "Error", 400


@app.route('/add_patient', methods=['POST', 'OPTIONS'])
@cross_origin()
def register_patient():
    conn = get_db_connection()
    cur = conn.cursor()
    try:
        data = request.get_json()
        patient_email = data['email']
        patient_password = data['password']
        patient_emergency_contact = data['emergencyContact']

        patient = cur.execute(
            '''INSERT INTO patient
            (patient_email, patient_password, patient_emergency_contact) VALUES (%s, %s, %s)''',
            (patient_email, patient_password, patient_emergency_contact))

        # commit the changes
        conn.commit()
        # close the cursor and connection
        cur.close()
        conn.close()
        return "Patient added successfully", 200
    except:
        # close the cursor and connection
        cur.close()
        conn.close()
        return "Error", 400


@app.route('/get_patients', methods=['GET', 'OPTIONS'])
@cross_origin()
def get_patient():
    conn = get_db_connection()
    cur = conn.cursor()
    try:
        cur.execute(
            '''SELECT * FROM patient''')
        patients = cur.fetchall()

        # commit the changes
        conn.commit()
        # close the cursor and connection
        cur.close()
        conn.close()
        return patients, 200
    except:
        # close the cursor and connection
        cur.close()
        conn.close()
        return "Error", 400


@app.route('/login', methods=['POST', 'OPTIONS'])
@cross_origin()
def login():
    conn = get_db_connection()
    cur = conn.cursor()
    data = request.get_json()
    email = data['email']
    entered_password = data['password']
    user_type = data["type"]
    try:
        if "doctor" in user_type:
            cur.execute('''SELECT emp_password FROM employee WHERE emp_email = %s''', (email,))
            actual_password = cur.fetchall()
            if actual_password[0][0] == entered_password:
                return "Login successful", 200
            else:
                return "Authentication failed", 400

        elif "patient" in user_type:
            print("in pabyg")
            cur.execute('''SELECT patient_password FROM patient WHERE patient_email = %s''', (email,))
            actual_password = cur.fetchall()
            print("actual_password", actual_password)
            if actual_password[0][0] == entered_password:
                return "Login successful", 200
            else:
                return "Authentication failed", 400
        else:
            return "Authentication failed", 400
    except:
        return "Authentication failed", 400

    finally:
        # close the cursor and connection
        cur.close()
        conn.close()


@app.route('/get_appointment', methods=['GET', 'OPTIONS'])
@cross_origin()
def get_appointment():
    conn = get_db_connection()
    cur = conn.cursor()
    date = request.args.get('date')
    try:
        cur.execute('''SELECT patient.patient_name, scheduled_clinic_hours.sched_start_time 
        FROM scheduled_clinic_hours 
        JOIN patient
        ON patient.patient_id = scheduled_clinic_hours.patient_id
        WHERE sched_start_time ::date 
        = %s''', (date,))
        appointments = cur.fetchall()
        return appointments, 200

    except:
        return "Error", 400

    finally:
        # close the cursor and connection
        cur.close()
        conn.close()
