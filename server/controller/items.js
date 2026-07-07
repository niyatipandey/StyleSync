const ClothingItems = require('../models/ClothingItem')

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

module.exports = {
    handleGetItems
}