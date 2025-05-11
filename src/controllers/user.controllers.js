import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { use } from "react";
import {User} from "../models/user.models.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser=asyncHandler(async(req,res)=>{
    //get user detail from fronend
    //validation-not empty
    //check if user already exists,email
    //check for images,avatar
    //upload them to cloudinary,avatar checkup
    //create user object-create entry in db
    //remove password and refresh token feild from response
    //check for user creation
    //return res

    const{fullname,email,username,password}=req.body   // here we get data from postman`s url(http://localhost/api/v1/users/register) post and send .....and by writing data in their body

    console.log("email",email);

    if(
        [fullname,email,username,password].some((feild)=>feild?.trim()==="")
    )
    {
        throw new ApiError(400,"all feilds are required")
    }
    const existedUser=User.findOne({
        $or:[{username},{email}]
    })
    if(existedUser){
        throw new ApiError(409,"user with email amd username  already exist!!")
    }
    const avatarLocalPath=req.files?.avatar[0]?.path;
    req.files?.coverImageLocalPath=req.files?.coverImage[0]?.Path;

    if(!avatarLocalPath){
        throw new ApiError(400,"avatar files is required!")
    }
    const avatar=await uploadOnCloudinary(avatarLocalPath)
    const coverImage=await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(400,"avatar file is required!!")
    }
    const user=await User.create({
        fullname,
        avatar:avatar.url,
        coverImage:coverImage?.url || "",
        email,
        password,
        username:username.toLowerCase()
    })
    const createdUser=await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500,"something went wrong! while registering user")
    }
    return res.status(201).json(
        new ApiResponse(200,createdUser,"user registered successfully!!!")
    )
})
export{registerUser}