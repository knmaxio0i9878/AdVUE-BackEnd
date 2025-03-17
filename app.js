const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
// CORS configuration
app.use(cors());
const PORT = 1908;

mongoose.connect("mongodb://127.0.0.1/Advue")
    .then(() => {
        console.log("Database Connected Successfully");
    })
    .catch((err) => {
        console.log("Database Connection Error", err);
    });

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

const userRoutes = require('./src/Router/UserRoutes');
const productRoutes = require('./src/Router/ProductRoutes');
const advue = require("./src/Router/AdvantageAdvue");
const custom = require("./src/Router/CustomRoutes");
const size = require('./src/Router/SizeRoutes')
const location = require("./src/Router/LocationRoutes")
const admin = require("./src/Router/AdminRoutes")
const order = require("./src/Router/OrderRoutes")
const payment = require("./src/Router/PaymentRoute")
const inquiry = require("./src/Router/InquiryRoutes")
const feedback = require("./src/Router/FeedbackRoutes")




app.use('/user', userRoutes);
app.use('/product', productRoutes);
app.use('/custom', custom);
app.use('/payment', payment);
app.use('/advue', advue);
app.use('/size',size)
app.use('/location',location)
app.use('/admin',admin)
app.use('/order',order)
app.use('/inquiry',inquiry)
app.use('/feedback',feedback)

