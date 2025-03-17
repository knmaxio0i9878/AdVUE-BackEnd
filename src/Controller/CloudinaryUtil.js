const cloudinary = require('cloudinary').v2;

const uploadimg = async (file) => {
//   if (!file || !file.path) {
//     throw new Error('No file path found');
//   }

  cloudinary.config({
    cloud_name: "drl7llkoc",
    api_key: "157484768788431",
    api_secret: "Hs6n57QLpFTa7sLsXTWT77YZPeI"
  });

  try {
    const result = await cloudinary.uploader.upload(file);
    // console.log(result);
    
    return result;
  } catch (error) {
    console.log("error");
    
  }
};

module.exports = {
  uploadimg
};
