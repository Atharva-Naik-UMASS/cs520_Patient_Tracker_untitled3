from flask import Flask, request
from flask_cors import CORS, cross_origin
from backend.routes import appointment_routes, employee_routes, patient_routes, login_routes

app = Flask(__name__)
CORS(app, origins="http://localhost:3000")


@app.route('/')
def welcome():
    return "Welcome!"


@app.route('/get_all_employees')
def get_all_employees():
    return employee_routes.get_all_employees()


@app.route('/add_employee', methods=['POST'])
def add_employee():
    return employee_routes.add_employee()


@app.route('/add_patient', methods=['POST', 'OPTIONS'])
@cross_origin()
def register_patient():
    return patient_routes.register_patient()


@app.route('/get_patients', methods=['GET', 'OPTIONS'])
@cross_origin()
def get_patient():
    return patient_routes.get_patient()


@app.route('/login', methods=['POST', 'OPTIONS'])
@cross_origin()
def login():
    return login_routes.login()


@app.route('/get_appointment', methods=['GET', 'OPTIONS'])
@cross_origin()
def get_appointment():
    return appointment_routes.get_appointment()


@app.route('/schedule_appointment', methods=['POST', 'OPTIONS'])
@cross_origin()
def set_appointment():
    return appointment_routes.set_appointment()


@app.route('/get_docs', methods=['GET', 'OPTIONS'])
@cross_origin()
def get_docs():
    return employee_routes.get_docs()
