import React, { useState } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUser} from '@fortawesome/free-solid-svg-icons'
import "./schedule_appointment.css"
import getPatientName from '../login/login.js'
import { ReactSession } from 'react-client-session';

const AppointmentForm = ({ onSubmit }) => {
  const [doctorName, setDoctorName] = useState('');
  const [doctorNames, setDoctorNames] = useState([]);
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const patient = ReactSession.get("patient_name");
  const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/schedule_appointment",{
                method: "POST",
                mode : "cors",
                headers: {
                  'Content-Type' : 'application/json',
                  'Access-Control-Allow-Credentials': 'true',
                  'Access-Control-Allow-Origin':'http://127.0.0.1:5000',
                  'Access-Control-Allow-Methods':'POST,GET,OPTIONS',
                  'Access-Control-Allow-Headers': '*'
                },
                body: JSON.stringify({"doctor":doctorName,"date":appointmentDate,"time":appointmentTime,"patient":patient})
              }).catch(error => console.log(error))
              if (response.ok) {
                alert("Successfully Scheduled!!!");
                window.location.replace("/patient_dashboard");
              }

              else {
                alert("This time slot is not available");
              }
  };

window.onload = async function() {
    const app_info = await fetch("http://localhost:5000/get_docs",{
                method: 'GET',
                mode : "cors",
                headers: {
                  'Access-Control-Allow-Credentials': 'true',
                  'Access-Control-Allow-Origin':'http://127.0.0.1:5000',
                  'Access-Control-Allow-Methods':'GET,OPTIONS'
                },
              }
            ).then((response) => response.json())
            .then((data) => data);
    setDoctorNames(app_info);

}

  return (
    <div className="formbold-main-wrapper">
      <div className="formbold-form-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="formbold-mb-5">
            <label htmlFor="doctor" className="formbold-form-label"> Select Doctor </label>
            <select
              id="doctor"
              value={doctorName}
              className="formbold-form-input"
              onChange={(e) => setDoctorName(e.target.value)}
            >
              <option value="">Select Doctor</option>
              {doctorNames.map((doctor, index) => (
                <option key={index} value={doctor}>
                  {doctor}
                </option>
              ))}
            </select>
          </div>
          <div className="formbold-mb-5">
            <label htmlFor="date" className="formbold-form-label"> Appointment Date </label>
            <input
            id="date"
              type="date"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
            />
          </div>
          <div className="formbold-mb-5">
            <label htmlFor="time" className="formbold-form-label"> Appointment Time </label>
            <input
            id="time"
              type="time"
              value={appointmentTime}
              onChange={(e) => setAppointmentTime(e.target.value)}
            />
          </div>
          <button type="submit">Book Appointment</button>
        </form>
      </div>
    </div>
  );
};

const AppointmentBookingPage = () => {
  const handleFormSubmit = (formData) => {
    // send the data to your backend
    console.log('Form submitted:', formData);
    // save the appointment in database
  };

  return (
    <div>
      <nav className="navbar">
        <button class="right"><FontAwesomeIcon icon={faUser}></FontAwesomeIcon> Profile</button>
      </nav>
      <h1>Book Appointment</h1>
      <AppointmentForm onSubmit={handleFormSubmit} />
    </div>
  );
};

export default AppointmentBookingPage;