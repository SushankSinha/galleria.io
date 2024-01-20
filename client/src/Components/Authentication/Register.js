import React, { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import register from "./Photos/register.png";
import api from '../api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  async function userData(e){
    e.preventDefault();

    try{

    const response = await api.post(`/register`,  {name : name, email: email, password : password});

    if (response.status === 201) {
      setSuccess(true)
      setTimeout(()=>{
        navigate("/login");
      },1000)
    }      
  } catch (error) {
        
      alert(error.message)
    }
  };

  return (
    <div>
    <form method="POST">
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
          display: "grid"
        }}
        elevation={10}
      >
        <h2 style={{ margin: "20px auto" }}>Sign Up</h2>

        <picture
          style={{textAlign: 'center',
          width: '100%',
            height: "30vh",
            backgroundImage: `url(${register})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundPosition: 'center'
          }}
          alt="Register"
        />

        <form method="POST">
          <TextField
            id="outlined-basic"
            label="Full Name"
            variant="outlined"
            required={true}
            style={{ margin: "10px", display: "flex",
          flexDirection : 'column' }}
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Email"
            type="email"
            variant="outlined"
            required={true}
            style={{ margin: "10px", display: "flex",
          flexDirection : 'column' }}
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

          <TextField
            id="outlined-basic"
            label="Password"
            type="text"
            required={true}
            variant="outlined"
            style={{ margin: "10px", display: "flex",
          flexDirection : 'column' }}
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />

          <Button
            onClick={userData}
            variant="contained"
            style={{ fontWeight: "bold", display: "flex",
          flexDirection : 'column', margin: "10px auto", width: '95%' }}
          >
            Sign Up
          </Button>

          <h5 style={{ margin: "10px", fontSize : '15px' }}>
            Already a member? <Link to="/login">Log In</Link>
          </h5>
        </form>
      </Paper>
    </Box>
    </form>
    {success &&
        toast.success("Account created", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })}
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
    </div>
  );
}

export default Register