import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "./doctor_appointments.css" // Import your custom CSS file for styling


const AppointmentsPage = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [rawdata, setData] = useState([]);
    const [appointments, setAppointments] = useState([]);
  
    const handleDateChange = async (date) => {
      setSelectedDate(date);
      date = formatDate(date);
      var apps;
      // Simulating fetching appointments for the selected date (replace with actual API call)
      // For demonstration purposes, using a filtered dummy array of appointments
       const app_info = await fetch("http://localhost:5000/get_appointment?date="+date,{
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
       if (app_info.length>0) {
//            console.log(apps);
            const appointments = getFormattedAppointment(app_info);
            setAppointments(appointments);
       }
    };

    const getFormattedAppointment = app => {
        var app_formatted = [];
        for (var i=0;i<Object.keys(app).length;i++) {
            console.log({id: i+1, date: formatDate(new Date(app[i][1])),patientName:app[i][0]})
            app_formatted.push({id: i+1, date: formatDate(new Date(app[i][1])),patientName:app[i][0],time:formatTime(new Date(app[i][1]))});
        }
        return app_formatted;
    };
    const formatDate = date => {
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
        date.getDate()
      ).padStart(2, '0')}`;
    };

    const formatTime = time => {
          return `${String(time.getHours())}:${String(time.getMinutes() + 1)}`;
     };

  const dummyAppointments = [
    {
      id: 1,
      date: '2023-12-15',
      patientName: 'John Doe',
      description: 'Routine checkup',
      // Add more appointment details as needed
    },
    {
      id: 2,
      date: '2023-12-18',
      patientName: 'Jane Smith',
      description: 'Follow-up visit',
      // Add more appointment details as needed
    },
    // Add more dummy appointments here if needed
  ];

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Appointments</h1>
      <div className="row">
        <div className="calendar-page col-md-1 mb-1">
          <div className="calendar-container">
            <Calendar onChange={handleDateChange} value={selectedDate} />
          </div>
        </div>
        <div className="col-md-8">
          <div className="appointments-container">
            <h2>Appointments for {selectedDate.toDateString()}</h2>
            {appointments.length > 0 ? (
              <ul className="list-group">
                {appointments.map(appointment => (
                  <li key={appointment.id} className="list-group-item">
                    { <p>Time: {appointment.time}</p> }
                    <p>Patient: {appointment.patientName}</p>
                    {/* Display more appointment details */}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No appointments for this date.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );

};
export default AppointmentsPage;
