from flask import request
from backend import connection


def get_all_employees():
    conn = connection.get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM public.employee;')
    employees = cur.fetchall()
    cur.close()
    conn.close()
    print(employees)
    return employees, 200


def add_employee():
    conn = connection.get_db_connection()
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


def get_docs():
    conn = connection.get_db_connection()
    cur = conn.cursor()

    try:
        cur.execute('''SELECT employee_name FROM employee where job_id=1''')
        appointments = cur.fetchall()
        print(appointments)
        return appointments, 200

    except:
        return "Error", 400

    finally:
        # close the cursor and connection
        cur.close()
        conn.close()
