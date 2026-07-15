require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const authRoute = require('./routes/auth')
const itemsRoute = require('./routes/items')
const outfitRoute = require('./routes/outfits')
const aiRoute = require('./routes/aiRouter')

const app = express();
const port = process.env.PORT || 3000;

const cors = require('cors');
/*app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://layrd-eight.vercel.app"
  ],
  methods: ["GET", "POST", "PATCH", "DELETE"],
}));*/
app.use(cors());
app.use(express.static('public'))

app.use(express.urlencoded({extended :false}));
app.use(express.json());

app.use('/auth',authRoute)
app.use('/items',itemsRoute)
app.use('/outfits',outfitRoute)
app.use('/ai',aiRoute);

mongoose.connect(process.env.MONGO_URL).
then(()=>{
    console.log("MongoDB Connected")
    app.listen(port, () => {
        console.log("Port connected");});
    })
.catch((err)=>console.log(err));

