const ClothingItems = require('../models/ClothingItem')
const mongoose = require('mongoose')

async function handleGetItems(req,res){
    try{
        const filter = {};
        if(req.query.category){
            filter.category = req.query.category;
        }
        if(req.query.gender){
            filter.gender = req.query.gender;
        }
        const items = await ClothingItems.find(filter);
        return res.status(200).json(items);
    }catch(err){
        res.status(500).json({message: err.message})
    }
}

async function handleGetItemsById(req,res){
    try{
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({message: "Invalid item id"});
        }
        const item = await ClothingItems.findById(id);
        if(!item){
            return res.status(404).json({message:"Item not found"});
        }
        return res.status(200).json(item);
    }catch(err){
        return res.status(500).json({message:err.message})
    }
}

module.exports = {
    handleGetItems,
    handleGetItemsById
}