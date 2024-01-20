import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import express from 'express'
import ImageData from './imageSchema.js';
import User from "../models/userSchema.js";
const router = express.Router();

// Route to get all the images details

router.get('/getStatusDetails/:userId', async (req, res) => {

  const userId = req.params.userId;
  const user = User.findById({_id:userId})
  if(user){
  try {
    const imageDetails = await ImageData.find({savedStatus : true});

    if(imageDetails){
    res.send(imageDetails);
    }else {
      res.json({message : 'No data found'})
    }

  } catch (error) {

    res.status(500).json({ error: 'Internal Server Error' });

  }
}
});

router.get('/getDownloadDetails/:userId', async (req, res) => {

  const userId = req.params.userId;
  const user = User.findById({_id:userId})
  if(user){
  try {
    const imageDetails = await ImageData.find({downloadStatus : true});
    if(imageDetails){
    res.send(imageDetails);
    }else {
      res.json({message : 'No data found'})
    }

  } catch (error) {

    res.status(500).json({ error: 'Internal Server Error' });

  }
}
});

router.post('/download-image', async (req, res) => {
  try {
    const { userId, imageUrl, imageId, imgName} = req.body;

    const existingDetails = await ImageData.findOne({ userId, imageId });

    if (!existingDetails) {

      const newDownloadedImage = new ImageData({userId, imageUrl, imageId, imgName, downloadStatus : true});

      await newDownloadedImage.save();

      res.status(201).json({ message: 'Image downloaded successfully' });
    }else if(existingDetails){
      await ImageData.updateOne({ userId, imageId },{ $set: {downloadStatus: true}})
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/save-image', async (req, res) => {
  try {
    const { userId, imageUrl, imageId, imgName } = req.body;

    const existingDetails = await ImageData.findOne({ userId, imageId });

    if (existingDetails) {

      await ImageData.updateOne({ userId, imageId },{ $set: {savedStatus: true}});

      res.status(201).json({ message: 'Saved status updated successfully' });
    } else {

      const newSavedImage = new ImageData({userId, imageUrl, imageId, imgName, savedStatus: true});

      await newSavedImage.save();
      res.status(201).json({ message: 'Image saved successfully' });
    }
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;

