import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUser} from '@fortawesome/free-solid-svg-icons'
import "./doc_dash.css";

const Doc_Dash = ({ onAppointmentsClick, onTestResultsClick, onProfileClick }) => {
  return (
    <div>
      <nav className="navbar">
        <button class="right" onClick={onProfileClick}><FontAwesomeIcon icon={faUser}></FontAwesomeIcon> Profile</button>
      </nav>
      <div className="main-buttons">
        <button onClick={onAppointmentsClick}>Check Appointments</button>
        <button onClick={onTestResultsClick}>Check Test Results</button>
      </div>
      
    </div>
  );
};

export default Doc_Dash;