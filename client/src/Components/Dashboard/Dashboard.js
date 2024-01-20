import React, { useState, useEffect } from "react";
import axios from "axios";
import ImageCard from "./ImageCard";
import "./Image.css";
import { Container} from "@mui/material";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const apiKey = process.env.REACT_APP_API_KEY;
  const btnGroup = [
    "Digital",
    "Nature",
    "Marketing",
    "Technology",
    "Waterfall",
    "Computer",
    "Mountain",
    "Dessert"
  ];
  
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const encodedText = encodeURIComponent(searchQuery)
          .replace(/%20/g, '+');
  
        const response = await axios.get(
          `https://pixabay.com/api/?key=${apiKey}&q=${encodedText}&image_type=photo`
        );
  
        if (response.status === 200) {
          setImages(response.data.hits);
        } else {
          console.error('Failed to fetch images. Status:', response.status);
        }
      } catch (error) {
        console.error('Error during API request:', error.message);
      }
    };
  
    fetchImages();
// eslint-disable-next-line
  }, [searchQuery]);

  async function handleButtonClick(query) {
    try {
      const response = await axios.get(
        "https://pixabay.com/api/?key="+apiKey+"&q=" +
          query +
          "&image_type=photo&pretty=true"
      );
      if (response.status === 200) {
        setImages(response.data.hits);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Container style={{ width : '30%', margin: "3% auto", display: "flex" }}>
        <input
          type="text"
          className="imageText"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Images..."
          style={{
          width : '100%',
          flex: "1",
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          background : 'transparent',
          color : 'white',
          height : '50px'
  }}
        />
      </Container>
      <Container >
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
          style={{width : '80%', margin: "auto", display: "flex", flexDirection : 'row', flexWrap : 'wrap', justifyContent :'center' }}
        >
          {btnGroup.map((item, index) => (
            <Button
              style={{ width: "120px", height : 'fit-content', margin : '1%' }}
              key={index}
              onClick={() => handleButtonClick(item)}
            >
             <strong> {item}</strong>
            </Button>
          ))}
        </ButtonGroup>
      </Container>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          margin: "auto",
          justifyContent: "center",
        }}
      >
        {images.map((noteItem) => {return (<ImageCard key={noteItem.id} image={noteItem} />)})}
      </div>
      
    </>
  );
}

export default Dashboard;
