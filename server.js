const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));//to serve our public folder throuhgh html
app.set('view engine', 'ejs'); // Set EJS as the view engine
let products = [];


//APi middleware
app.use(express.json());//this is to accept data in json format
app.use(express.urlencoded());// this is to decode data to send through html form

app.get('/get-product', (req, res) => {
    res.sendFile(path.join(__dirname, '+public/products-add.html'));
});

app.post('/add-product', (req, res) => {
    const newProduct = {
        categoryName: req.body.categoryName,
        productName: req.body.productName,
        productPrice: req.body.productPrice
    };
    products.push(newProduct);
    res.redirect('/get-product');
    // console.log(req.body);//the data we get is in the body of request
    // res.send(req.body);
});
try {
    await newProduct.save(); // Save the new product to the database
    res.redirect('/get-product');
} catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
