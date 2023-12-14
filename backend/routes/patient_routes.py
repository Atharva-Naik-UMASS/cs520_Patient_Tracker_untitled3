from flask import request
from backend import connection


def register_patient():
    conn = connection.get_db_connection()
    cur = conn.cursor()
    try:
        data = request.get_json()
        patient_email = data['email']
        patient_password = data['password']
        patient_emergency_contact = data['emergencyContact']

        cur.execute(
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


def get_patient():
    conn = connection.get_db_connection()
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
