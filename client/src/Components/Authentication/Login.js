import React, {useState} from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useNavigate} from "react-router-dom";
import login from "./Photos/login.png";
import api from '../api'
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CircularProgress from '@mui/material/CircularProgress';

function Login({setLog}) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loginLoader, setLoginLoader] = useState(false);
  const navigate = useNavigate();

    async function handleSubmit() {
      setLoginLoader(true)
      try {

        const response = await api.post(`/login`, {email : email, password : password}, {credentials : 'include'});
        if(response.status === 200){
          setLoginLoader(false)
          Cookies.set('token', response.data.token);
          localStorage.setItem('userId', response.data.user)
          const userIdToken = response.data.user;
          setSuccess(true)
          setLog(false)
          setLoginError(false);
          setTimeout(()=>{
            navigate(`/dashboard/${userIdToken}`);
            window.location.reload()
          },1000)
          
        }
  
      } catch (error) {
        setLoginError(true)
        setLoginLoader(false)
        setTimeout(() => {
          setLoginError(false)
        }, 1000);
       console.log(error)
      }

    };

  return (
    <>
    < form method = 'POST'>
    <Box
      style={{
        display: "block",
        margin: "5% auto",
        maxWidth: "80%",
        height: "fit-content",
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        style={{
          display: "grid",
        }}
        elevation={10}
      >
        <h2 style={{ margin: "20px auto", display : 'block' }}>Login</h2>

        <picture
          style={{textAlign: 'center',
          width: '100%',
            height: "300px",
            backgroundImage: `url(${login})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundPosition: 'center'
          }}
          alt="Login"
        />
        {loginLoader && (<CircularProgress />)}
        <TextField
          id="outlined-basic1"
          label="Email"
          variant="outlined"
          style={{ margin: "10px" }}
          name = 'email'
          required = {true}
          type="email"
          value = {email}
          onChange={(e)=>{setEmail(e.target.value)}}
        />
        <TextField
          id="outlined-basic2"
          label="Password"
          variant="outlined"
          style={{ margin: "10px" }}
          name = 'password'
          required = {true}
          value = {password}
          type="password"
          onChange={(e)=>{setPassword(e.target.value)}}
        />

        <Button
          onClick = {handleSubmit}
          variant="contained"
          style={{ fontWeight: "bold", margin: "10px" }}
        >
          Login
        </Button>

        <h5 style={{ margin: "10px", fontSize : '15px' }}><Link to="/reset_password">Reset Password</Link> | <Link to="/register">Create an Account</Link>
        </h5>
      </Paper>
    </Box>
    </ form>
    {success && (toast.success("Login Successful", {
position: "top-right",
autoClose: 1000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "colored",
}))}

{loginError && (toast.error("Invalid credentials!", {
position: "top-right",
autoClose: 1000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "colored",
}))}

    <ToastContainer
position="top-right"
autoClose={1000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
/>
    </>
  );
}

export default Login;