import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUser} from '@fortawesome/free-solid-svg-icons'
import "./doc_dash.css";

const Doc_Dash = ({ onAppointmentsClick, onTestResultsClick, onProfileClick }) => {

  const handleSubmit = (e,page) => {
    e.preventDefault();
    window.location.replace(page)
  }

  return (
    <div>
      <nav className="navbar">
        <button class="right" onClick={onProfileClick}><FontAwesomeIcon icon={faUser}></FontAwesomeIcon> Profile</button>
      </nav>
      <div className="main-buttons">
        <button onClick={(e) => {handleSubmit(e,"/doctor_appointments")}}>Check Appointments</button>
        <button onClick={(e) => {handleSubmit(e,"/view_reports")}}>Check Test Results</button>
      </div>
      
    </div>
  );
};

export default Doc_Dash;