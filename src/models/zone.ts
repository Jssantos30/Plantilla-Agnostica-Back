import mongoose, {Schema, model} from "mongoose";

interface zone {
    adress:string;
    point:[point_interface];
    city:string;
    watchman:any;
    department:string;
}

interface point_interface {
    qr:string,
    point_name:string
}

interface watchman_id {
    watchman_id:any
}

const watchman_schema = new Schema<watchman_id>({
    watchman_id:{
        type:mongoose.Types.ObjectId, ref:'users',
        //unique:true
    }
})

const point_schema = new Schema<point_interface>({
    qr:{
        type:String,
        //unique:true,
        //required:true
    },
    point_name:{
        type:String,
        //required:true,
        //unique:true
    }
}); 


const zone_schema = new Schema<zone>({ 
    adress:{ 
        type:String,
        unique:true,
        rerquired:true
    },
    point:{
        type:[point_schema],
        //required:true
        //default:[]
    },  
    watchman:{ 
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "users"
            }
        ],
        rerquired:true
    },
    city:{
        type:String,
        required:true
    },
    department:{
        type:String,
        required:true
    }
}, {versionKey:false}); 



export const zone_model = model<zone>("zone", zone_schema);