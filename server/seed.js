require("dotenv").config();

const mongoose = require('mongoose')
const ClothingItem = require('./models/ClothingItem.js');
const womentops = require('./data/womentops.json')
const womenBottoms = require('./data/womenBottoms.json')
const womenShoes = require('./data/womenShoes.json')
const womenAccessories = require('./data/womenAccessories.json')

async function seed() {
    try{
        await mongoose.connect(process.env.MONGO_URL)
        await ClothingItem.deleteMany({})
        const items =[
            ...womentops,
            ...womenBottoms,
            ...womenShoes,
            ...womenAccessories
        ]
        await ClothingItem.insertMany(items)
        
        process.exit(0);
    }catch(err){
        console.error(err);
        process.exit(1);
    }
} 
seed()