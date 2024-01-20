import mongoose from 'mongoose'

const imageSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      imageUrl: {
        type: String,
      },
      imageId: {
        type: String,
      },
      imgName: {
        type: String,
      },
      savedStatus: {
        type: Boolean,
        default: false,
      },
      downloadStatus: {
        type: Boolean,
        default: false,
      }
    });

const ImageData = mongoose.model('IMAGE', imageSchema);

export default ImageData
