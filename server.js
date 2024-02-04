const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost:27017/productsDB', { useNewUrlParser: true, useUnifiedTopology: true });

const productSchema = new mongoose.Schema({
    categoryName: String,
    productName: String,
    productPrice: Number,
});

const Product = mongoose.model('Product', productSchema);

app.get('/get-product', async (req, res) => {
    try {
        const products = await Product.find();
        res.render('products', { products });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/add-product', async (req, res) => {
    const newProduct = new Product({
        categoryName: req.body.categoryName,
        productName: req.body.productName,
        productPrice: req.body.productPrice
    });

    try {
        await newProduct.save();
        res.redirect('/get-product');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
