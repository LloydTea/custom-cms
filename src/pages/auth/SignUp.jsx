import axios from "axios";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";

function SignUp() {
  const [success, setSuccess] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pin, setPin] = useState("");
  const verifiedPin = "1138";
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      firstName,
      lastName,
      email,
      password,
    };
    if (verifiedPin === pin) {
      try {
        const response = await axios.post("/api/user", userData);
        if (response.status == 201) {
          setSuccess(true);
          console.log(`Registration Successful: `, response.data);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <div>
      {!success ? (
        <div>
          <h1 className='text-center'>Sign Up</h1>
          <Form onSubmit={handleSubmit} method='post'>
            <div className='mb-4 border-top-1'>
              <Form.Label htmlFor='firstName'>First Name</Form.Label>
              <Form.Control
                type='text'
                id='firstName'
                name='firstName'
                onChange={(e) => setFirstName(e.target.value)}
                placeholder='First Name'
                className='mb-4'></Form.Control>
              <Form.Label htmlFor='lastName'>Last Name</Form.Label>
              <Form.Control
                type='text'
                id='lastName'
                name='lastName'
                placeholder='Last Name'
                onChange={(e) => setLastName(e.target.value)}
                className='mb-4'></Form.Control>
              <Form.Label htmlFor='email'>Email</Form.Label>
              <Form.Control
                type='email'
                id='email'
                name='email'
                placeholder='Email'
                onChange={(e) => setEmail(e.target.value)}
                className='mb-4'></Form.Control>
              <Form.Label htmlFor='password'>Password</Form.Label>
              <Form.Control
                type='password'
                id='password'
                name='password'
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password'
                className='mb-4'></Form.Control>

              <Form.Label htmlFor='pin'>Pin</Form.Label>
              <Form.Control
                type='text'
                id='pin'
                name='pin'
                onChange={(e) => setPin(e.target.value)}
                placeholder='pin'></Form.Control>

              <Button
                variant='primary'
                size='lg'
                className='w-100 mt-4'
                type='submit'>
                Create An Account
              </Button>
            </div>
          </Form>
          <p className='text-center'>
            Already have an account? <br />
            Go back to login...
          </p>
        </div>
      ) : (
        <div>
          <p className='text-center p-4 bg-primary border border-primary bg-opacity-25'>
            Your account was created successfully, <br />
            click the button below to login
          </p>
        </div>
      )}
      {/* Additional content for the Home component */}
    </div>
  );
}

export default SignUp;
