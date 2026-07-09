require("dotenv").config();

const mongoose = require('mongoose')
const ClothingItem = require('./models/ClothingItem.js');
const womenTops = require('./data/womenTops.json')
const womenBottoms = require('./data/womenBottoms.json')
const womenShoes = require('./data/womenShoes.json')
const womenAccessories = require('./data/womenAccessories.json')

async function seed() {
    try{
        console.log(process.env.MONGO_URL)
        await mongoose.connect(process.env.MONGO_URL)
        console.log("MongoDB Connected");
        await ClothingItem.deleteMany({})
        const items =[
            ...womenTops,
            ...womenBottoms,
            ...womenShoes,
            ...womenAccessories
        ]
        await ClothingItem.insertMany(items)
        console.log(`${items.length} items seeded`);
        
        process.exit(0);
    }catch(err){
        console.error(err);
        process.exit(1);
    }
} 
seed()