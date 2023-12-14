import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProfilePage = () => {

  const initialUserProfile = {
    name: 'John Doe',
    email: 'john@example.com',
    emergency_contact: '4131235678',
  };

  const [userProfile, setUserProfile] = useState(initialUserProfile);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserProfile({ ...userProfile, [name]: value });
  };
  
  const saveProfile = () => {
    setIsEditing(false);
    console.log('Updated Profile:', userProfile); 
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">User Profile</h1>

      <div className="card">
        <div className="card-body">
          
          <h3 className="card-title">{userProfile.name}</h3>

          <p className="card-text">
            <strong className="me-3">Email:</strong>  
            {userProfile.email}
          </p>

          <div className="form-group row">

  <strong className="col-sm-2 col-form-label">
    Emergency Contact:
  </strong>

  <div className="col-sm-10">
    {isEditing ? (
      <input 
        className="form-control"
        name="emergency_contact"
        value={userProfile.emergency_contact}  
        onChange={handleInputChange} 
      />
    ) : (
      <p className="form-control-plaintext">
        {userProfile.emergency_contact}
      </p> 
    )}
  </div>

</div>

          {isEditing ? (
            <button className="btn btn-primary me-2" onClick={saveProfile}>
              Save
            </button> 
          ) : (
            <button className="btn btn-secondary" onClick={() => setIsEditing(true)}>
              Edit Profile  
            </button>
          )}
            
        </div>
      </div>

    </div>
  );
}

export default ProfilePage;