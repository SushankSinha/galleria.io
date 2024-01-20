import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import api from "../api";

export default function DownloadList() {
  const [downloadData, setDownloadData] = useState([]);
  const userId = localStorage.getItem("userId");

  async function downloadDetails() {
    const response = await api.get(`/getDownloadDetails/${userId}`);
    if (response) {
      console.log(response.data);
      setDownloadData(response.data);
    } else {
      console.error("Failed to update item");
    }
  }

  useEffect(() => {
    downloadDetails();
    // eslint-disable-next-line
  }, []);

  return (
    <>
    <h2 style={{display:"flex", margin : '10px auto', color : 'white', justifyContent: 'center'}}>Download List...</h2>

    <div
        style={{
          display: "flex",
          flexDirection: "row",
          margin: "5%",
          justifyContent: "center",
        }}
      >

      {downloadData.length>0 ? (downloadData.map((item, index) => {

    return (
      <a href={item.imageUrl} target="_blank" rel="noopener noreferrer">
      <List key={index}
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
        margin : '10px'
      }}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt={item.imageId} src={item.imageUrl} />
          </ListItemAvatar>
          <strong> <ListItemText style={{marginLeft : '10px'}} primary={`Image Id: ${item.imgName}`} /></strong>
        </ListItem>
        <Divider variant="inset" component="li" />
      </List>
      </a>
    )
    })): (      <List key={"demo"}
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
        display: "flex",
        margin: "5px 40%",
        justifyContent: "center",
      }}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt='N/A' src='' />
          </ListItemAvatar>
          <ListItemText primary='Ahh..! No Data Found' />
        </ListItem>
        <Divider variant="inset" component="li" />
      </List>)} 
      </div>
    </>
  );
}
