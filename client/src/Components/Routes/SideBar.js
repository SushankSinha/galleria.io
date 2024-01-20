import React, { useState} from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import StarsIcon from '@mui/icons-material/Stars';
import GetAppIcon from '@mui/icons-material/GetApp';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import Cookies from 'js-cookie';
import api from '../api';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Sidebar() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  });

  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  async function userLogout() {
    try {
      const response = await api.get("/logout");
      if (response.status === 200) {
        localStorage.removeItem('userId');
        Cookies.remove('token')
        setSuccess(true);
        setTimeout(() => {
          navigate("/login");
          setSuccess(false);
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{
        alignItems: "left",
        width: anchor === "top" || anchor === "bottom" ? "auto" : 200
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List style={{ margin: "10px", padding: "10px" }}>
        <ListItem disablePadding>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={`/dashboard/${userId}`}
          >
            <ListItemButton>
              <HomeIcon style={{ margin: "10px" }} />
              Dashboard
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem disablePadding>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={`/saved/${userId}`}
          >
            <ListItemButton>
              <StarsIcon style={{ margin: "10px" }} />
              Favourite
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem disablePadding>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={`/downloads/${userId}`}
          >
            <ListItemButton>
              <GetAppIcon style={{ margin: "10px" }} /> Downloads{" "}
            </ListItemButton>
          </Link>
        </ListItem>
      </List>
      <Divider sx = {{borderBottomWidth : 3, backgroundColor : 'black'}} />
      <List style={{ margin: "10px", padding: "10px" }}>
        <ListItem disablePadding>
        <Link 
            style={{ textDecoration: "none", color: "black" }}
          >
          <ListItemButton onClick={userLogout}>
            {" "}
            <LogoutIcon style={{ margin: "10px" }} />
            
              Logout{" "}
          </ListItemButton>
          </Link>
        </ListItem>
      </List>
    </Box>
  );

  

  return (
    <>
    <div>
        {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            style={{ color: "white" }}
            onClick={toggleDrawer(anchor, true)}
          >
            <MenuIcon />
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
    {success &&
        toast.success("Logged Out Successfully", {
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
    </>
  );
}