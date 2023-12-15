# cs520_Patient_Tracker_untitled3

Project members: Atharva Naik, Shreya Kendhe, Rachna Soundatti

This system will allow for efficient and accurate management of patient information. With a digital system, healthcare providers can easily access and update patient records, ensuring that the information is up-to-date and readily available when needed. This is crucial for providing timely and appropriate care to patients.
Secondly, a digitalized system enables seamless communication and coordination among healthcare professionals. With real-time updates in medical records, doctors, nurses, and other healthcare staff can easily collaborate and share information about a patient's condition, treatment plans, and progress. This improves the overall quality of care and reduces the chances of errors or miscommunication.
Furthermore, a digitalized system enhances patient safety. By having access to complete and accurate medical records, healthcare providers can make informed decisions and avoid potential medication errors or adverse reactions. It also allows for better monitoring of patients, ensuring that they receive the right treatment and follow-up care.

### Prerequisites:
Node https://nodejs.org/en/download/current

Python3 https://www.python.org/downloads/

PostgreSQL https://www.postgresql.org/download/

### Instructions:
To run, clone the project using the command

git clone https://github.com/Atharva-Naik-UMASS/cs520_Patient_Tracker_untitled3.git

Database:

Use the database schema from the db folder to crate required schema

Backend:
* cd backend
* pip install -r requirements.txt
* python -m flask run

Frontend: 
* cd client/patient-tracker
* npm install
* npm start

Features:
* Profile management: The profile management feature allows users to create and manage their personal profiles within the patient tracking portal. Users can update their contact information, emergency contacts and preferences. This feature ensures that the portal provides personalized and relevant information to each user, enhancing the overall user experience. 
* User authentication: User authentication is a crucial feature that ensures only authorized individuals can access the patient tracking portal. It involves verifying the user's identity through credentials such as username and password. Robust authentication mechanisms protect sensitive patient data from unauthorized access, maintaining the privacy and confidentiality of the information. We have implemented user credential security by encrypting it using pgcrypt.
* Real-time updates: Real-time updates provide users with the latest information regarding patient status, appointments, and medical records. This feature ensures that healthcare professionals have access to up-to-date information, enabling them to make timely and informed decisions. Real-time updates also enhance communication and collaboration among healthcare providers, leading to improved patient outcomes and streamlined workflows.
* Information security: Information security is a critical feature in a patient tracking portal to protect sensitive patient data from unauthorized access, breaches, and data loss. It involves implementing robust security measures such as encryption, access controls, and regular security audits. Information security ensures the confidentiality, integrity, and availability of patient data, instilling trust in the portal and complying with privacy regulations such as HIPAA. We have implemented data security during transit using HTTPS and data safety at rest using PGCRYPT.
* Intuitive UI Design: The project follows a simple and easy to use low bandwidth consuming design to ensure access to all. We created the UI using React, HTML and CSS.

Tech Stack:
* Server-side Programming Language: Python is chosen for its simplicity, readability, and extensive libraries. It's a versatile language for both back-end and data processing tasks. Python's readability and ease of use make development and maintenance more efficient. It also offers excellent support for data processing and manipulation, which is crucial for handling patient records. 
* Web Framework: Flask is a microframework, which means it is lightweight and does not come with unnecessary features out of the box. For a straightforward application like a patient scheduling system, Flask provides just what is needed without unnecessary overhead. 
* Database Management System: PostgreSQL is an open-source, enterprise-class relational database management system. It provides data integrity, reliability, and scalability, which are essential for healthcare applications. PostgreSQL is known for its ACID compliance, making it ideal for ensuring data consistency and reliability, and it supports complex queries needed for patient data retrieval. 
* Front-End Framework: React is a popular front-end library that enables the creation of dynamic and interactive user interfaces. Its component-based architecture is suitable for designing a responsive and user-friendly healthcare interface. React offers fast rendering and a modular structure, enhancing the user experience. Its extensive community and ecosystem provide access to various pre-built components and tools.
* Version Control: Git and GitHub are used for version control and collaboration. They ensure efficient code management and collaborative development. Git allows for version tracking and code collaboration, making it easier to manage code changes and work as a team. 



