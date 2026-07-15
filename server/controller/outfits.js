const Outfit = require('../models/Outfit')
const mongoose = require('mongoose')

async function handleGetOutfit(req,res){
    try{
        const findOutfit =await Outfit.find({userId:req.user.id})
            .populate("slots.top")
            .populate("slots.bottom")
            .populate("slots.shoes")
            .populate("slots.accessory")
        if(findOutfit.length === 0){
            return res.status(404).json("No outfit found")
        }
        return res.status(200).json(findOutfit);
    }catch(err){
        console.log(err)
        return res.status(500).json({message:err.message});
    }
}

async function handlePostOutfit(req,res){
    try{

        const top = req.body.top || null;
        const bottom = req.body.bottom || null;
        const shoes = req.body.shoes || null;
        const accessory = req.body.accessory || null;

        const createOutfit =await Outfit.create({
            userId:req.user.id,
            slots:{
                top:top,
                bottom:bottom,
                shoes:shoes,
                accessory:accessory
            }
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