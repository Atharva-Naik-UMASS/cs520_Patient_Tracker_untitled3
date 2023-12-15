import unittest
from unittest.mock import MagicMock, patch
from flask import Flask
from ..routes import patient_routes


class TestPatientFunctions(unittest.TestCase):

    @patch('backend.connection.get_db_connection')
    def test_register_patient_success(self, mock_db_connection):
        app = Flask(__name__)
        app.config['TESTING'] = True
        app.test_client()

        with app.test_request_context(
                json={'email': 'john.doe@example.com', 'password': 'password123', 'emergencyContact': '123-456-7890'}):
            with patch('backend.routes.patient_routes.register_patient',
                       return_value=('Patient added successfully', 200)):
                mock_cursor = MagicMock()
                mock_db_connection.return_value.cursor.return_value = mock_cursor

                response = patient_routes.register_patient()

                self.assertEqual(response, ("Patient added successfully", 200))

    @patch('backend.connection.get_db_connection')
    def test_register_patient_error(self, mock_db_connection):
        app = Flask(__name__)
        app.config['TESTING'] = True
        app.test_client()

        with app.test_request_context(
                json={'email': 'john.doe@example.com', 'password': 'password123', 'emergencyContact': '123-456-7890'}):
            with patch('backend.routes.patient_routes.register_patient', return_value=('Error', 400)
                       ):
                mock_cursor = MagicMock()
                mock_cursor.execute.side_effect = Exception("Database error")
                mock_db_connection.return_value.cursor.return_value = mock_cursor

                response = patient_routes.register_patient()

                self.assertEqual(response, ("Error", 400))

    @patch('backend.connection.get_db_connection')
    def test_get_patient_success(self, mock_db_connection):
        app = Flask(__name__)
        app.config['TESTING'] = True
        app.test_client()

        with app.test_request_context():
            mock_cursor = MagicMock()
            mock_cursor.fetchall.return_value = [(1, 'john.doe@example.com', 'password123', '123-456-7890')]
            mock_db_connection.return_value.cursor.return_value = mock_cursor

            response, status_code = patient_routes.get_patient()

            self.assertEqual(status_code, 200)
            self.assertEqual(response, [(1, 'john.doe@example.com', 'password123', '123-456-7890')])

    @patch('backend.connection.get_db_connection')
    def test_get_patient_error(self, mock_db_connection):
        app = Flask(__name__)
        app.config['TESTING'] = True
        app.test_client()

        with app.test_request_context():
            mock_cursor = MagicMock()
            mock_cursor.execute.side_effect = Exception("Database error")
            mock_db_connection.return_value.cursor.return_value = mock_cursor

            response, status_code = patient_routes.get_patient()

            self.assertEqual(status_code, 400)
            self.assertEqual(response, "Error")


if __name__ == '_main_':
    unittest.main()
