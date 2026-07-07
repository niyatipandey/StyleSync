const Outfit = require('../models/Outfit')

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

module.exports = {
    handlePostOutfit
}