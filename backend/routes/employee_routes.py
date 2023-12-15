from flask import request
from backend import connection


def get_all_employees():
    """
    Retrieve all employees from the database.

    This function establishes a database connection, fetches all employee records,
    and returns a list of employees along with an HTTP status code.

    Returns:
        tuple: A tuple containing a list of all employees and an HTTP status code (200 - OK).
    """
    conn = connection.get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM public.employee;')
    employees = cur.fetchall()
    cur.close()
    conn.close()
    print(employees)
    return employees, 200


def get_docs():
    """
    Retrieve doctors' names from the database.

    This function establishes a database connection, retrieves names of employees
    with the job_id indicating doctors, and returns a list of doctor names along
    with an HTTP status code.

    Returns:
        tuple: A tuple containing a list of doctor names and an HTTP status code (200 - OK).
    """
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
