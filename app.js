require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const app = express()
const adminRoutes = require('./Routes/adminRoutes')
const userRoutes = require('./Routes/userRoutes')

app.use(express.json())
app.use('/api/admin', adminRoutes)
app.use('/api/users', userRoutes)

mongoose.connect("mongodb://127.0.0.1:27017/ecommerce", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error: "));
db.once("open", () => console.log("Connected Successfully"))

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})