import User from "../Models/User.js";
import Organization from "../Models/Organization.js";
import mongoose from "mongoose";

export const createuser = async(req,res) =>{
    try{
     const {name, email, organizationID, role} = req.body;
     if(!name|| !email) return res.status(400).json({message:"All Fileds are Required"});
 

     if (!mongoose.Types.ObjectId.isValid(organizationID)) {
      return res.status(400).json({ message: "Invalid organizationID format" });
    }

     const existuser = await User.findOne({email});
     if(existuser){
        return res.status(404).json({message:"User already exist"});
     }

     const organization = await Organization.findById(organizationID);
     if(!organization){
        return res.status(404).json({message:"organization not found"});
     }
     const user = new User({
        name,
        email,
        organizationId: organizationID,
        role,
    });

     await user.save();
     res.status(201).json(user);
    }catch(err){
     res.status(500).json({messages: err.message})
    }
}


