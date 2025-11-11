import Organization from "../Models/Organization.js";

export const createorganization = async(req,res)=>{
    try{
      const {name} = req.body;
      if(!name) return res.status(400).json({message:"name:required"})

      const existingOrg = await Organization.findOne({ name: name.trim() });
      if (existingOrg) {
        return res.status(409).json({ message: "Organization already exists" });
      }

      const org = new Organization({name});
      await org.save();
      res.status(201).json(org);
    }catch(err){
      res.status(500).json({message: err.message})
    }
};


