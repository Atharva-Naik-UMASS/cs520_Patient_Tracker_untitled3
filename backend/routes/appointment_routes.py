from flask import request
from backend import connection


def set_appointment():
    """
    Set an appointment for a patient with a doctor.

    This function retrieves information from the request JSON data,
    schedules an appointment in the database, and returns a message
    indicating whether the appointment was successfully scheduled or not.

    Returns:
        str: A message indicating success or failure of the appointment scheduling.
    """
    conn = connection.get_db_connection()
    cur = conn.cursor()
    try:
        data = request.get_json()
        doc_name = data['doctor']
        patient_name = data['patient']
        appointment_date = data['date']
        appointment_time = data['time']

        print(doc_name, patient_name, appointment_date, appointment_time)

        cur.execute("SELECT employee_id FROM employee where employee_name= %s", (doc_name,))
        doc_id = cur.fetchall()
        print(doc_id[0][0])
        cur.execute("SELECT patient_id FROM patient where patient_name= %s", (patient_name,))
        pat_id = cur.fetchall()
        print(pat_id[0][0])

        datetime = appointment_date + " " + appointment_time

        cur.execute('''SELECT * FROM scheduled_clinic_hours WHERE doc_id=%s and sched_start_time=%s''',
                    (doc_id[0][0], datetime))
        exists = cur.fetchall()
        if exists:
            return "This time slot is not available", 400

        patient = cur.execute(
            '''INSERT INTO scheduled_clinic_hours
            (doc_id, patient_id, sched_start_time, department_id) VALUES (%s, %s, %s, 1)''',
            (doc_id[0][0], pat_id[0][0], datetime))

        # commit the changes
        conn.commit()
        # close the cursor and connection
        cur.close()
        conn.close()
        return "Appointment Scheduled Successfully", 200
    except:
        # close the cursor and connection
        cur.close()
        conn.close()
        return "Error", 400


def get_appointment():
    """
    Retrieve appointments for a specific date.

    This function takes a date parameter from the request arguments
    and fetches appointments scheduled for that particular date.

    Returns:
        tuple: A tuple containing appointment details (patient name and appointment time).
    """
    conn = connection.get_db_connection()
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
