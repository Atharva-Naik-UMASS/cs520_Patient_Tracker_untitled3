import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUser} from '@fortawesome/free-solid-svg-icons'
import "./doc_dash.css";

const Pat_Dash = ({ onCreateAppointmentClick, onAppointmentsClick, onTestResultsClick, onProfileClick }) => {
  return (
    <div>
      <nav className="navbar">
        <button class="right" onClick={onProfileClick}><FontAwesomeIcon icon={faUser}></FontAwesomeIcon> Profile</button>
      </nav>
      <div className="main-buttons">
        <button onClick={onAppointmentsClick}>Check My Scheduled Appointments</button>
        <button onClick={onCreateAppointmentClick}>Schedule Appointment</button>
        <button onClick={onTestResultsClick}>Check My Test Results</button>
      </div>
      
    </div>
  );
};

export default Pat_Dash;