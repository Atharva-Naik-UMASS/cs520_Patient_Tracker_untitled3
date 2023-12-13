import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Login from 'c:/Users/rachn/OneDrive/Documents/SEM 1/CS 520/project/cs520_Patient_Tracker_untitled3/client/patient-tracker/src/components/login/login.js'

describe('Login Component', () => {
  it('submits the form with valid credentials for doctor login', async () => {
    const { getByLabelText, getByText } = render(<Login />);
    
    // Fill in the email and password fields
    fireEvent.change(getByLabelText('Email'), { target: { value: 'doctor@example.com' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'password123' } });

    // Click the "Login as Doctor" button
    fireEvent.click(getByText('Login as Doctor'));

    // Wait for navigation or any expected behavior after submission
    await waitFor(() => {
      expect(window.location.href).toBe('http://localhost/');
      // You might also want to check for some UI changes after successful login
    });
  });

  it('submits the form with valid credentials for patient login', async () => {
    const { getByLabelText, getByText } = render(<Login />);
    
    // Fill in the email and password fields
    fireEvent.change(getByLabelText('Email'), { target: { value: 'patient@example.com' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'password456' } });

    // Click the "Login as Patient" button
    fireEvent.click(getByText('Login as Patient'));

    // Wait for navigation or any expected behavior after submission
    await waitFor(() => {
      expect(window.location.href).toBe('http://localhost/');
      // You might also want to check for some UI changes after successful login
    });
  });

});
