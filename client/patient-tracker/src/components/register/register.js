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
    age: '',
    password:'',
    conf_pass:''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    var flag = 0
    if(value == "") {
      alert(name+" cannot be empty");
      flag = 1
    }
    if(name === "phoneNumber" || name === "emergencyContact"){
      const phno = validator.isMobilePhone(value);
      if(!phno){
        alert("Please enter a valid Phone Number");
        flag = 1;
      }
      else if (name === "password"){
        const pass = validator.isStrongPassword(value)
        alert(pass)
        if(!pass){
          alert("Password not strong enough");
          flag = 1;
        }
      }
      else if (name === "conf_pass"){
        if(value !== userData.password){
          alert("Passwords do not match");
          flag = 1;
        }
      }
    }
    if(flag){
      setUserData({...userData,[name]:""});
    }
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission - you can perform validation and send data to the server here
    console.log(userData);
    alert("Successfully Registered!!!");
    window.location.replace("/login");
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
          <input type="email" name="email" value={userData.email} onChange={handleChange} />
        </label>
        <br />
        <label>
          Address:
          <input type="text" name="address" value={userData.address} onChange={handleChange} />
        </label>
        <br />
        <label>
          Emergency Contact:
          <input type="number" name="emergencyContact" value={userData.emergencyContact} onChange={handleChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" value={userData.password} onChange={handleChange} />
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