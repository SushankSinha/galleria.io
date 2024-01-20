import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import CameraIcon from '@mui/icons-material/Camera';
import Sidebar from './Routes/SideBar';

function Navbar() {

  const userId = localStorage.getItem('userId');
 
  return (
    <>
    <Box  sx={{ display: 'flex' }}>
      <AppBar maxwidth="xl" position="static" component="nav">
        <Toolbar>
          { userId && (<Sidebar/>)}
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          <CameraIcon style={{ marginLeft: "1%" }} />
          </Link>
          <Typography
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              display: "flex",
              color: "inherit"
            }}
          >
            <Link to="/" style={{ color: "white", textDecoration: "none" }}>
              {" "}
              Galleria.Io{" "}
            </Link>
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {/* News */}
          </Typography>
          {userId? null : (<><Link to="/login" style={{ color: "white", textDecoration: "none" }}>
          <Button color="inherit">Login</Button></Link><Link to="/register" style={{ color: "white", textDecoration: "none" }}>
          <Button color="inherit">Register</Button></Link></>) }
        </Toolbar>
      </AppBar>
    </Box>

    </>
  );
}

export default Navbar;