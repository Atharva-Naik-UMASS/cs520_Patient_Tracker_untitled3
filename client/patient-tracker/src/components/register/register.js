// RegistrationForm.js
import React, { useState } from 'react';
import validator from 'validator' 
import "./Register.css"

const RegistrationForm = () => {
  const [userData, setUserData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    address: '',
    emergencyContact: '',
    password:'',
    conf_pass:''
  });
  var hist = '';
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  // var flag = 0

  // const handleBlur = (e) => {
     
  // }

  const validateForm = (e) => {
    for (var i in userData){
      if (userData[i.toString()] === '' ){
        alert(i+" Cannot be left Empty")
        return 1;
      }
      if (i === "phoneNumber" || i === "emergencyContact") {
        if (!validator.isMobilePhone(userData[i.toString()])) {
          setUserData({...userData,[i]:''})
          window.alert("Invalid Phone Number");
          return 1;
        }
      }
      else if (i === "password") {
        if(!validator.isStrongPassword(userData[i.toString()])) {
          setUserData({...userData,[i]:''})
          window.alert("Please create a stronger Password");
          return 1;
        }
      }
      else if (i === "conf_pass") {
        if(userData[i.toString()] !== userData["password"]) {
          setUserData({...userData,[i]:''})
          window.alert("Passwords do not match!");
          return 1;
        }
      }

    }
    return 0; 

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission - you can perform validation and send data to the server here
    if(!validateForm(e)){
      const response = await fetch("http://localhost:5000/add_patient",{
        method: "POST",
        headers: {
          'Content-Type' : 'Registered User'
        },
        body: JSON.stringify(userData)
      })
      .catch(error => console.log(error))
      if (response.ok) {
        alert("Successfully Registered!!!");
        window.location.replace("/login");
      } 

      else {
        alert("We cannot register at this time please try again");
      }
    }
  };

  return (
    <div className="Register">
      <h2 className='h2'>Patient Registration</h2>
      <form className="box" title="Patient Registration" onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={userData.username} onChange={handleChange} />
        </label>
        <br />
        <label>
          Phone Number:
          <input type="number" name="phoneNumber" value={userData.phoneNumber} onChange={handleChange} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" value={userData.email}  onChange={handleChange} />
        </label>
        <br />
        <label>
          Address:
          <input type="text" name="address" value={userData.address}  onChange={handleChange} />
        </label>
        <br />
        <label>
          Emergency Contact:
          <input type="number" name="emergencyContact" value={userData.emergencyContact} onChange={handleChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" value={userData.password}  onChange={handleChange} />
        </label>
        <label>
          Confirm Password:
          <input type="password" name="conf_pass" value={userData.conf_pass} onChange={handleChange} />
        </label>
        <br />
        <button type="submit" className='submit'>Register</button> 
      </form>
    </div>
  );
};

export default RegistrationForm;