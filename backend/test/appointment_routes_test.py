import unittest
from unittest.mock import MagicMock, patch
from flask import Flask
from ..routes import appointment_routes


class TestAppointmentFunctions(unittest.TestCase):

    @patch('backend.connection.get_db_connection')
    def test_set_appointment_success(self, mock_db_connection):
        app = Flask(__name__)
        app.config['TESTING'] = True
        app.test_client()

        with app.test_request_context(json={'doctor': 'Dr. Smith', 'patient': 'John Doe', 'date': '2023-01-01', 'time': '09:00'}):
            with patch('backend.routes.appointment_routes.set_appointment', return_value=('Appointment Scheduled Successfully', 200)):
                mock_cursor = MagicMock()
                mock_cursor.fetchall.return_value = []
                mock_db_connection.return_value.cursor.return_value = mock_cursor

                response = appointment_routes.set_appointment()

                self.assertEqual(response, ("Appointment Scheduled Successfully", 200))

    @patch('backend.connection.get_db_connection')
    def test_set_appointment_time_not_available(self, mock_db_connection):
        app = Flask(__name__)
        app.config['TESTING'] = True
        app.test_client()

        with app.test_request_context(json={'doctor': 'Dr. Smith', 'patient': 'John Doe', 'date': '2023-01-01', 'time': '09:00'}):
            with patch('backend.routes.appointment_routes.set_appointment', return_value=('This time slot is not available', 400)):
                mock_cursor = MagicMock()
                mock_cursor.fetchall.return_value = [(1,)]  # Simulating that the time slot is already occupied
                mock_db_connection.return_value.cursor.return_value = mock_cursor

                response = appointment_routes.set_appointment()

                self.assertEqual(response, ("This time slot is not available", 400))

    @patch('backend.connection.get_db_connection')
    def test_get_appointment_success(self, mock_db_connection):
        app = Flask(__name__)
        app.config['TESTING'] = True
        app.test_client()

        with app.test_request_context(query_string={'date': '2023-01-01'}):
            mock_cursor = MagicMock()
            mock_cursor.fetchall.return_value = [('John Doe', '2023-01-01 09:00')]
            mock_db_connection.return_value.cursor.return_value = mock_cursor

            response, status_code = appointment_routes.get_appointment()

            self.assertEqual(status_code, 200)
            self.assertEqual(response, [('John Doe', '2023-01-01 09:00')])

    @patch('backend.connection.get_db_connection')
    def test_get_appointment_error(self, mock_db_connection):
        app = Flask(__name__)
        app.config['TESTING'] = True
        app.test_client()

        with app.test_request_context(query_string={'date': '2023-01-01'}):
            mock_cursor = MagicMock()
            mock_cursor.execute.side_effect = Exception("Database error")
            mock_db_connection.return_value.cursor.return_value = mock_cursor

            response, status_code = appointment_routes.get_appointment()

            self.assertEqual(status_code, 400)
            self.assertEqual(response, "Error")


if __name__ == '_main_':
    unittest.main()