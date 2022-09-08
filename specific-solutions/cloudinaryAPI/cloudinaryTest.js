import { v2 as cloudinary } from 'cloudinary';

import dotenv from 'dotenv';
dotenv.config();
// configuring cloudinary with the values in our dotenv file
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_USER_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const makeRequest = async () => {
    const result = await cloudinary.uploader.upload("https://i.ytimg.com/vi/RZQTVnzMx4U/maxresdefault.jpg", {
        resource_type: 'image',
        folder: 'signIt'
      })
    console.log(result)
}

makeRequest()