const express =  require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser')

const connectDB = require("./config/db")

dotenv.config()
connectDB();

const app =  express()

app.use( cors());
app.use(bodyParser.json());


const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')


app.use("/api/products", productRoutes);
app.use('/api/users', userRoutes)
app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));



app.get('/',(req,res) => {
    res.send("Welcome to Vinay Yadav Server  Running on......");
})


const PORT = process.env.PORT || 3000 ;

app.listen( PORT , () => {
    console.log(`Server Running on PORT ${PORT}`)
})