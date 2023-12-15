import unittest
from unittest.mock import MagicMock, patch
from flask import Flask
from ..routes import employee_routes


class TestEmployeeFunctions(unittest.TestCase):

    @patch('backend.connection.get_db_connection')
    def test_get_all_employees_success(self, mock_db_connection):
        app = Flask(__name__)
        app.config['TESTING'] = True
        app.test_client()

        with app.test_request_context():
            mock_cursor = MagicMock()
            mock_cursor.fetchall.return_value = [(1, 'John Doe', 'Doctor'), (2, 'Jane Smith', 'Nurse')]
            mock_db_connection.return_value.cursor.return_value = mock_cursor

            response, status_code = employee_routes.get_all_employees()

            self.assertEqual(status_code, 200)
            self.assertEqual(response, [(1, 'John Doe', 'Doctor'), (2, 'Jane Smith', 'Nurse')])

    @patch('backend.connection.get_db_connection')
    def test_get_docs_success(self, mock_db_connection):
        app = Flask(__name__)
        app.config['TESTING'] = True
        app.test_client()

        with app.test_request_context():
            mock_cursor = MagicMock()
            mock_cursor.fetchall.return_value = [('Dr. Smith',)]
            mock_db_connection.return_value.cursor.return_value = mock_cursor

            response, status_code = employee_routes.get_docs()

            self.assertEqual(status_code, 200)
            self.assertEqual(response, [('Dr. Smith',)])

    @patch('backend.connection.get_db_connection')
    def test_get_docs_error(self, mock_db_connection):
        app = Flask(__name__)
        app.config['TESTING'] = True
        app.test_client()

        with app.test_request_context():
            mock_cursor = MagicMock()
            mock_cursor.execute.side_effect = Exception("Database error")
            mock_db_connection.return_value.cursor.return_value = mock_cursor

            response, status_code = employee_routes.get_docs()

            self.assertEqual(status_code, 400)
            self.assertEqual(response, "Error")

if __name__ == '_main_':
    unittest.main()