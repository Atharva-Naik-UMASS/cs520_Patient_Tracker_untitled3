import React from 'react';
// import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Ensure to import the jest-dom extension
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/react';


// import AppointmentsPage from './doctor_appointment';
import AppointmentsPage from 'c:/Users/rachn/OneDrive/Documents/SEM 1/CS 520/project/cs520_Patient_Tracker_untitled3/client/patient-tracker/src/components/manage-appointment/doctor_appointments.js';



describe('AppointmentsPage Component', () => {
  it('renders the AppointmentsPage component', () => {
    const { getAllByText } = render(<AppointmentsPage />);
    
    const headingElements = getAllByText('Appointments', { exact: false }); // Allow partial matching
    expect(headingElements.length).toBeGreaterThan(0); // Check if at least one heading is found
  });

  it('renders correctly', () => {
    const {queryByText} = render(<AppointmentsPage />);
    
    expect(queryByText(/Appointments/i)).toBeInTheDocument();
    expect(queryByText(/No appointments for this date/i)).toBeInTheDocument();
    
    component.setProps({ selectedDate: new Date('2023-12-25') });
    
    expect(queryByText(/Appointments for December 25, 2023/i)).toBeInTheDocument();
  });

  it('displays appointments for selected date', async () => {
    const {queryByText} = render(<AppointmentsPage />);
  
    // Select date
    userEvent.click(screen.getByText('15')); 
    
    await waitFor(() => {
      expect(queryByText(/John Doe/)).toBeInTheDocument(); 
    });
  });

  it('displays appointment details', async () => {
    component.setProps({
      appointments: [
        { 
          id: 1,
          date: '2023-12-15',
          patientName: 'John Doe', 
          description: 'Check up'  
        }
      ] 
    });
    
    expect(queryByText(/John Doe/)).toBeInTheDocument();
    expect(queryByText(/Check up/)).toBeInTheDocument(); 
  });

  // it('displays appointments for selected date', () => {
  //   const { getByText } = render(<AppointmentsPage />);
    
  //   // Change the date format to match how it's displayed in the component
  //   // const selectedDateElement = getByText('Wed Dec 18 2023');
  //   // const dateRegex = /Dec 18 2023/; // Adjust regex to match your date format
  //   // const selectedDateElement = getByText(dateRegex);
  //   const selectedDateElement = screen.getByText((content, element) => {
  //     // Use a regular expression to match the date format
  //     const dateRegex = /Dec\s+18\s+2023/;
  //     // Check if the element contains the date text
  //     return dateRegex.test(content);
  //   });
  //   expect(selectedDateElement).toBeInTheDocument();
  // });




});
