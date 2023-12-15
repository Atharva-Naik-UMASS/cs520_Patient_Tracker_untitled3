import React from 'react';
import { render, act } from '@testing-library/react';
import AppointmentsPage from '../components/manage-appointment/doctor_appointments.js';
import Calendar from 'react-calendar'; // import your calendar library

// Mock fetch requests
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([
      ['John Doe', '2023-12-15T08:00:00Z'],
      ['Jane Smith', '2023-12-15T09:30:00Z']
    ]),
  })
);

describe('AppointmentsPage component', () => {
  let component;

  beforeEach(() => {
    component = render(<AppointmentsPage />);
  });

  it('fetches appointments for a selected date', async () => {
    const date = new Date('2023-12-15');
    const formattedDate = '2023-12-15';

    // Find and interact with the calendar component using its specific library methods
    const calendarComponent = component.getByTestId('your-calendar-testid'); // replace 'your-calendar-testid' with the actual test id or selector

    act(() => {
      // Hypothetical example: If using react-calendar library
      calendarComponent.onChange(date); // use the appropriate method provided by your calendar library
    });

    // Rest of your test to verify fetching appointments based on the selected date
    expect(fetch).toHaveBeenCalledWith(`http://localhost:5000/get_appointment?date=${formattedDate}`, {
      method: 'GET',
      // other options
    });
    // other assertions related to fetched appointments
  });

  // Other test cases...
});
