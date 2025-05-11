import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

    // Configuration
    cloudinary.config({ 
        cloud_name: CLOUDINARY_CLOUD_NAME, 
        api_key: CLOUDINARY_API_KEY, 
        api_secret: CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
    });
    

    const uploadOnCloudinary=async(localFilePath)=>{
        try{
            if(!ifLocalFilePath)return null
            const response=await cloudinary.uploader.upload(localFilePath,{
                resource_type:"auto"
            })
            console.log("files is uploaded on cloudinary",response.url);
            return response;
        }
        catch(error){
            fs.unlinkSync(localFilePath)  //REMOVE THE TEMPORARY FILES AS UPLOAD OPERATION GOT FAILED
            return null
        }
    }
    export {uploadOnCloudinary}