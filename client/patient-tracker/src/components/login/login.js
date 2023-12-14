import React, { useState } from "react";

import Form from "react-bootstrap/Form";

import Button from "react-bootstrap/Button";

import { Navigate, useNavigate } from "react-router-dom";

import "./Login.css";
import { ReactSession } from 'react-client-session';

export default function Login() {

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  // const navigate = useNavigate();

  function validateForm() {

    return email.length > 0 && password.length > 0;

  }

  async function handleSubmit(e,page) {
//  alert(page)
     e.preventDefault();
    // Handle form submission - you can perform validation and send data to the server here
    const response = await fetch("http://localhost:5000/login",{
      method: "POST",
      mode : "cors",
      headers: {
        'Content-Type' : 'application/json',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Origin':'http://127.0.0.1:5000',
        'Access-Control-Allow-Methods':'POST,GET,OPTIONS',
        'Access-Control-Allow-Headers': '*'
      },
      body: JSON.stringify({"email":email,"password":password, "type":page})
    }).catch(error => console.log(error))
    if (response.ok) {
      if (page === "/patient_dashboard"){
          const name = await response.json().then(n => n['name']);
          ReactSession.set("patient_name",name);
          alert("Successfully Authenticated!!!");
          window.location.replace("/patient_dashboard");
      }
      else {
          alert("Successfully Authenticated!!!");
          window.location.replace(page);
      }
    }

    else {
      alert("We cannot login at this time please try again");
    }
  }

  return (
    <div className="Login">
    <img src="./landing.png" width={750} height={500} alt='Landing Page' />

      <Form onSubmit={handleSubmit}>
      <h1>Login to your Account</h1>

        <Form.Group size="lg" controlId="email">

          <Form.Label>Email</Form.Label>
          <br/>
          <Form.Control

            autoFocus

            type="email"

            value={email}

            onChange={(e) => setEmail(e.target.value)}

          />

        </Form.Group>

        <Form.Group size="lg" controlId="password">

          <Form.Label>Password</Form.Label>
          <br/>

          <Form.Control

            type="password"

            value={password}

            onChange={(e) => setPassword(e.target.value)}

          />

        </Form.Group>
        <br/>
        {/* <Link to="/signup" className="btn btn-primary">Sign up</Link> */}
        <button class="main-buttons" block size="lg" type="submit" variant="primary" onClick={e => handleSubmit(e,"/doctor_dashboard")}>

          Login as Doctor

        </button>

        <br/>
        <br/>
        <button class="main-buttons" block size="lg" type="submit" variant="primary"  onClick={e => handleSubmit(e,"/patient_dashboard")}>

          Login as Patient

        </button>

        <h6>Not Registered Yet? <a href="/register">Create an account</a></h6>

      </Form>

    </div>

  );

}