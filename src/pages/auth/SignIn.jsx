import axios from "axios";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/login", {
        email,
        password,
      });
      res.statusText == "OK" ? navigate("/account/dashboard") : null;
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <h1 className='text-center'>Login In</h1>
      <Form onSubmit={handleLogin} className='mb-4 border-top-1'>
        <Form.Label htmlFor='email'>Email</Form.Label>
        <Form.Control
          type='email'
          id='email'
          name='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email'
          className='mb-4'></Form.Control>
        <Form.Label htmlFor='password'>Password</Form.Label>
        <Form.Control
          type='password'
          id='password'
          name='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}></Form.Control>
        <Button
          variant='primary'
          size='lg'
          className='w-100 mt-4'
          type='submit'>
          Login
        </Button>
      </Form>
      <p className='text-center'>Not a member?</p>
    </div>
  );
}

export default SignIn;
