const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));//to serve our public folder throuhgh html
let products = [];


//APi middleware
app.use(express.json());//this is to accept data in json format
app.use(express.urlencoded({ extended: false }));// this is to decode data to send through html form

app.get('/get-product', (req, res) => {
    res.sendFile(path.join(__dirname, '+public/products-add.html'));
});

app.post('/add-product', (req, res) => {
    console.log(req.body);//the data we get is in the body of request
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});