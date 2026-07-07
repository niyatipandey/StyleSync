const Outfit = require('../models/Outfit')

async function handleGetOutfit(req,res){
    try{
        const findOutfit =await Outfit.find({});
        if(!findOutfit){
            return res.status(404).json("No outfit found")
        }
        return res.status(200).json(findOutfit);
    }catch(err){
        return res.status(500).json({message:err.message});
    }
}

async function handlePostOutfit(req,res){
    try{
        const tops = req.body.tops || null;
        const bottom = req.body.bottom || null;
        const shoes = req.body.shoes || null;
        const accessory = req.body.accessory || null;

        const createOutfit =await Outfit.create({
            userId:req.user.id,
            tops:tops,
            bottom:bottom,
            shoes:shoes,
            accessory:accessory,
        })

        return res.status(201).json({message:"Outfit created"});
    }catch(err){
        return res.status(500).json({message:err.message});
    }
}

async function handleDeleteOutfit(req,res){
    try{
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({message: "Invalid item id"});
        }
        const deletedOutfit = await Outfit.findOneAndDelete({
            _id:id,
            userId:req.user.id
        });
        if(!deletedOutfit){
            return res.status(404).json({message:"Outfit not found"})
        }
        return res.status(200).json({message:"Outfit deleted"});
    }catch(err){
        return res.status(500).json({message:err.message});
    }
}

module.exports = {
    handleGetOutfit,
    handlePostOutfit,
    handleDeleteOutfit
}