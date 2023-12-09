import './App.css';
import Login from '../src/components/login/login'
import Doc_Dash from './components/dashboard/doctor_dashboard'
import Pat_Dash from './components/dashboard/patient_dashboard'
import Pat_Register from './components/register/register'
import Create_Appointment from './components/appointment-booking/schedule_appointment'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

export default function App() {
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
                        path="*"
                        element={<Navigate to="/" />}
                    />
                </Routes>
            </Router>
        </>
    );
}

