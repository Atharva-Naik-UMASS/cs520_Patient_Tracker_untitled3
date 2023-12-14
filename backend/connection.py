import psycopg2
import os
from decouple import config


def get_db_connection():
    conn = psycopg2.connect(host='localhost',
                            port=config("DATABASE_PORT"),
                            database=config("DATABASE_NAME"),
                            user=config("DATABASE_USER"),
                            password=config("DATABASE_PASSWORD"))
    print(conn)
    return conn
