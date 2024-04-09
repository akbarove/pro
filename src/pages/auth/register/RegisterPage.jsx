import { Button, Input } from '@mui/material'
import "../register/register.css"
import { useState } from 'react';
import { auth } from '../../../firebas/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Navigate, useNavigate } from 'react-router-dom';


const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [copyPassword, setCopyPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  function register(e) {
    e.preventDefault();
    if (copyPassword !== password) {
      setError("Passwords didn't match");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {
        console.log(user);
        setError("");
        setEmail("");
        setCopyPassword("");
        setPassword("");
      })
      .catch((error) => console.log(error));
      navigate("/");
  }
  return (
    <div>
     <form onSubmit={register} className='form'>
        <h2>Create an account</h2>
        <Input onChange={(e) => setEmail(e.target.value)} style={{width:"250px"}} className='input' placeholder='Please enter your email' type='email' />
        <Input onChange={(e) => setPassword(e.target.value)} style={{width:"250px"}} className='input' placeholder='Please enter your password' type="password" /> 
        <Input onChange={(e) => setCopyPassword(e.target.value)} style={{width:"250px"}} className='input' placeholder='Please enter your password again' type="password" />  
        <button>create</button>
        {error ? <p style={{ color: "red" }}>{error}</p> : ""}
        </form>
    </div>
  )
}

export default LoginPage