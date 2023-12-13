import React, { useState } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUser} from '@fortawesome/free-solid-svg-icons'
import "./schedule_appointment.css"

const AppointmentForm = ({ onSubmit }) => {
  const [doctorName, setDoctorName] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ doctorName, appointmentDate, appointmentTime });
  };



  const doctorNames = ['Dr. John', 'Dr. Macy', 'Dr. Shepard'];

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
              type="date"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
            />
          </div>
          <div className="formbold-mb-5">
            <label htmlFor="time" className="formbold-form-label"> Appointment Time </label>
            <input
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