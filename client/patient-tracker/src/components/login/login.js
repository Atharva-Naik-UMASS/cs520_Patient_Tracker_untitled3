import React, { useState } from "react";

import Form from "react-bootstrap/Form";

import Button from "react-bootstrap/Button";

import "./Login.css";

export default function Login() {

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  function validateForm() {

    return email.length > 0 && password.length > 0;

  }

  function handleSubmit(event) {
    event.preventDefault();
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
        <button class="button-65"  block size="lg" type="submit" variant="primary" disabled={!validateForm()}>

          Login as Employee

        </button>

        <br/>
        <br/>
        <button class="button-65" variant="text" block size="lg" type="submit" disabled={!validateForm()}>

          Login as Patient

        </button>

        <h6>Not Registered Yet? <b>Create an account</b></h6>

      </Form>

    </div>

  );

}