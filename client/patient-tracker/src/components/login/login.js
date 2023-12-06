import React, { useState } from "react";

import Form from "react-bootstrap/Form";

import Button from "react-bootstrap/Button";

import { Navigate, useNavigate } from "react-router-dom";

import "./Login.css";

export default function Login() {

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  // const navigate = useNavigate();

  function validateForm() {

    return email.length > 0 && password.length > 0;

  }

  function handleSubmit(event,page) {
    event.preventDefault();
    window.location.replace(page)
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
        <button class="main-buttons" block size="lg" type="submit" variant="primary" onClick={e => handleSubmit(e,"/doctor_dashboard")} disabled={!validateForm()} >

          Login as Doctor

        </button>

        <br/>
        <br/>
        <button class="main-buttons" block size="lg" type="submit" variant="primary"  onClick={e => handleSubmit(e,"/patient_dashboard")} disabled={!validateForm()}>

          Login as Patient

        </button>

        <h6>Not Registered Yet? <a href="/register">Create an account</a></h6>

      </Form>

    </div>

  );

}