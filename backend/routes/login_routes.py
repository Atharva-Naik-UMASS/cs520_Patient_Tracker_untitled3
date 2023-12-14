from flask import request
from backend import connection


def login():
    conn = connection.get_db_connection()
    cur = conn.cursor()
    data = request.get_json()
    email = data['email']
    entered_password = data['password']
    user_type = data["type"]
    print(entered_password)
    try:
        if "doctor" in user_type:
            cur.execute('''SELECT emp_password,  FROM employee WHERE emp_email = %s''', (email,))
            actual_password = cur.fetchall()
            if actual_password[0][0] == entered_password:
                return "Login successful", 200
            else:
                return "Authentication failed", 400

        elif "patient" in user_type:
            print("in pabyg")
            cur.execute('''SELECT patient_password,patient_name FROM patient WHERE patient_email = %s''', (email,))
            actual_password = cur.fetchall()
            print("actual_password", actual_password[0][0])
            if actual_password[0][0] == entered_password:
                return {"name": actual_password[0][1]}, 200
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
