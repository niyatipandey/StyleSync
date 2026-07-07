const mongoose = require('mongoose');

const outfitSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    slots:{
        tops:{
            type:mongoose.Schema.Types.ObjectId,
            ref :'ClothingItem',
            default:null
        },
        bottom:{
            type:mongoose.Schema.Types.ObjectId,
            ref :'ClothingItem',
            default:null
        },
        shoes:{
            type:mongoose.Schema.Types.ObjectId,
            ref :'ClothingItem',
            default:null
        },
        accessory:{
            type:mongoose.Schema.Types.ObjectId,
            ref :'ClothingItem',
            default:null
        }
    },
},{timestamps:true})

const Outfit = mongoose.model('Outfit',outfitSchema);

module.exports = Outfit;