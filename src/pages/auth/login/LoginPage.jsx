import { Button, Input } from '@mui/material'
import "./login.css"
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebas/firebase';
import { registerVersion } from 'firebase/app';
import { useNavigate } from 'react-router-dom';


const LoginPage = () => {
  const [user,setUser] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  async function logIn(e) {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        console.log(user);
        setError("");
        setEmail("");
        setPassword("");
        navigate("/")
      })
        .catch((error) => {
            console.log(error);
            setError("SORRY, COULDN'T FIND YOUR ACCOUNT")
      });

  }
  return (
    <div>
     <form  onSubmit={registerVersion}>

     <div className='form'>
        <h1 >Log in </h1>
        <Input onChange={(e) => setEmail(e.target.value)} style={{width:"250px"}} className='input' placeholder='email' type='gmail' />
        <Input onChange={(e) => setPassword(e.target.value)} style={{width:"250px"}} className='input' placeholder='password' type="password" /> 
        <button onClick={logIn}>Login</button>
        {error ? <p style={{ color: "red" }}>{error}</p> : ""}

        </div>
     </form>
    </div>
  )
}

export default LoginPage