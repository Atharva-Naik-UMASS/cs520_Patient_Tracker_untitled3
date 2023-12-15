from flask import request
from backend import connection


def register_patient():
    """
    Register a new patient in the database.

    This function takes patient information from the request JSON data,
    including email, password, and emergency contact, and inserts it into
    the 'patient' table in the database.

    Returns:
        str: A message indicating the success or failure of patient registration.
             It returns an HTTP status code (200 - OK or 400 - Bad Request).
    """
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
    """
    Retrieve all patients from the database.

    This function fetches all patient records from the 'patient' table in the database.

    Returns:
        tuple: A tuple containing a list of all patients and an HTTP status code (200 - OK).
               It returns an error message along with an HTTP status code (400 - Bad Request)
               in case of an exception.
    """
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
