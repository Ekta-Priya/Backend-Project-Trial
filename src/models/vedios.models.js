import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoouseAggregatePaginate"
const vedioSchema=new Schema({
    vedioFile:{
        type:String,  //CLOUDINARY URL
        required:true,
    },
    thumbnail:{
        type:String,  
        required:true,
    },
    title:{
        type:String, 
        required:true,
    },
    description:{
        type:String,  
        required:true,
    },
    duration:{
        type:Number, 
        required:true,
    },
    veiws:{
        type:Number,
        default:0
    },
    isPublished:{
        type:Boolean,
        default:true
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamp:true})

vedioSchema.plugin(mongooseAggregatePaginate)
export const Vedio=mongoose.model("Vedio",vedioSchema)