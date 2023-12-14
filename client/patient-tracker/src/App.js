import './App.css';
import Login from '../src/components/login/login'
import Doc_Dash from './components/dashboard/doctor_dashboard'
import Pat_Dash from './components/dashboard/patient_dashboard'
import Pat_Register from './components/register/register'
import Create_Appointment from './components/manage-appointment/schedule_appointment'
import View_Doctor_Appointment from './components/manage-appointment/doctor_appointments'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import { ReactSession } from 'react-client-session';

export default function App() {
    ReactSession.setStoreType("localStorage");
    return (
        <>
            <Router>
                <Routes>
                    <Route
                        exact
                        path="/"
                        element={<Login />}
                    />
                    <Route
                        path="/doctor_dashboard"
                        element={<Doc_Dash />}
                    />
                    <Route
                        path="/patient_dashboard"
                        element={<Pat_Dash />}
                    />
                    <Route
                        path="/register"
                        element={<Pat_Register />}
                    />
                    <Route
                        path="/create_appointment"
                        element={<Create_Appointment />}
                    />
                    <Route
                        path="/doctor_appointments"
                        element={<View_Doctor_Appointment />}
                    />
                    <Route
                        path="*"
                        element={<Navigate to="/" />}
                    />
                </Routes>
            </Router>
        </>
    );
}

