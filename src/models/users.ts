import mongoose, { Schema, model, mongo } from "mongoose";

mongoose.pluralize(null);

interface users {
  password: string;
  document:string;
  name:string;
  last_name:string;
  phone_number:string;
  level_user: string;
  state: string;
  zones:[]
}

const users_schema = new Schema<users>({   
  password: {
    type: String,
    required: true,
  },
  document: {
    type: String,
    required: true,
    unique:true
  },
  name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
    required: true,
  },
  level_user: {
    type: String,
    default:"WATCHMAN",
    enum:["ADMIN", "WATCHMAN"], 
    required: true,
  },
  state: {
    type: String,
    default:"ACTIVE",
    enum:["ACTIVE", "INACTIVE"],
    required: true,
  },
  zones:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"zone",
      //unique:true 
    }
  ]
  
},{versionKey:false});

export const users_model = model <users>("users", users_schema);
