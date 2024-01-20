import React, {useState, useRef} from "react";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import GetAppIcon from '@mui/icons-material/GetApp';
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ShareIcon from '@mui/icons-material/Share';
import api from '../api';
import CardMedia from '@mui/material/CardMedia';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from "axios";

function ImageCard({image}) {
  const [IsSaved, setSaved] = useState(false);
  const [webformatURL, setWebFormatURL] = useState(image.webformatURL);
  const [successSaved, setSuccessSaved] = useState(false);
  const [urlCopy, setUrlCopy] = useState(false);
  const [successDownload, setSuccessDownload] = useState(false);
  const userId = localStorage.getItem('userId');

  const imageURLRef = useRef(null);
  async function handleCopyToClipboard () {
    if (imageURLRef.current) {
      try {
        navigator.clipboard.writeText(imageURLRef.current.value);
        setUrlCopy(true);
        setTimeout(()=>{
          setUrlCopy(false)
        }, 1000)
      } catch (err) {
        console.log('Unable to copy to clipboard', err);
      }
    }
  };

    const imageNameFunc=(url)=> {
    const path = new URL(url).pathname;
    const segments = path.replace(/^\/|\/$/g, '').split('/');
    const lastSegment = segments[segments.length - 1];
    const imageName = lastSegment.includes('.')
      ? lastSegment.split('.')[0]
      : lastSegment;
    const finalImageName = imageName.replace(/[^a-zA-Z0-9-]/g, '-');
    return finalImageName;
  }

  const tagsData = image.tags.split(',').map((tag) => ` #${tag.trim()}`).slice(0,2);


async function handleSave(){
  const saveName = imageNameFunc(image.pageURL)
    try {
      const response = await api.post(
        `/save-image`, {userId : userId, imageUrl : webformatURL, imageId : image.id, imgName : saveName});
      if (response.status === 201) {
        setSuccessSaved(true);
        setTimeout(() => {
          setSuccessSaved(false);
        }, 1000);
        console.log("Item updated successfully");
      } else {
        console.error("Failed to update item");
      }
    } catch (error) {
      console.error("Error", error);
    }
};

  async function handleDownload(imageUrl, fileName) {
    
    const saveName = imageNameFunc(image.pageURL)

    try {      
      const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
      const blob = new Blob([response.data], { type: 'image/jpeg' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName || "download.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      const downloadRes = await api.post(`/download-image`, {userId : userId, imageUrl : webformatURL, imageId : image.id, imgName : saveName});
        if (downloadRes.status === 201) {
          setSuccessDownload(true);
          setTimeout(() => {
            setSuccessDownload(false);
          }, 1000);
          console.log("Image downloaded successfully");
        } else {
          console.error("Failed to download image");
        } 


    } catch (error) {
      console.error("Error during download:", error);
    }
  }
  

  return (
    <>
    <Card sx={{display : 'block', width: 250, margin: "10px", backgroundColor : '#EBDBDB' }}>
      <CardContent sx = {{alignItems : 'center'}}>
      <CardMedia
        component="img"
        height="194"
        image={image.webformatURL}
        alt={image.tags}
      />
        <br />
        <Typography sx={{ marginBottom: "2px"}}><strong>Name:</strong> 
        {imageNameFunc(image.pageURL)}
        </Typography>
        <br/>
        <Typography sx={{ marginBottom: "2px"}}><strong>Tags:</strong> 
        {tagsData.map((tag, index) => (
          <li style={{display : "inline-block", whiteSpace : 'pre'}} key={index}>{tag}</li>
        ))}
        </Typography>
      </CardContent>
      <hr style={{border : '1px solid grey'}}/>
      <CardActions style = {{margin: 'auto', display : 'flex', flexDirection : 'row', justifyContent : 'center'}}>
        <Button
          onClick={() => {setSaved(!IsSaved);handleSave();}}
          size="small"
        >{IsSaved?(<FavoriteIcon style={{fill : 'red'}}/>) : (<FavoriteBorderIcon />)}
        </Button>
        <Button
        onClick={()=>{handleDownload(image.webformatURL, image.tags.split(',').map((tag) => tag.trim()).slice(0,1)); setWebFormatURL(image.pageURL)}}
          size="small"
        >
          <GetAppIcon/>
        </Button>
        <Button ref={imageURLRef} value={image.webformatURL}
          onClick={handleCopyToClipboard}
          size="small"
        >
          <ShareIcon/>
        </Button>
      </CardActions>
    </Card>
    {successSaved &&
        toast.success("Image marked as favourite", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })}
    {successDownload &&
        toast.info("Downloading...", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })}
    {urlCopy &&
        toast.warning("URL Copied to Clipboard", {
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

export default ImageCard;