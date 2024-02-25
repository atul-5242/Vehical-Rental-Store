const cloudnairy = require("cloudinary").v2;

exports.cloudnairyConnect = () =>{
    try {
        cloudnairy.config({
            // Configuring the cloudinary to upload MEDIA :
            cloud_name:process.env.CLOUD_NAME,
            api_key:process.env.API_KEY,
            api_secret:process.env.API_SECRET,
        });
    } catch (error) {
        console.log(error);
    }
}

// Profile taak done ho gya.
