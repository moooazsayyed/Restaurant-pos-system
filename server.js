const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));//to serve our public folder through html


//APi middleware
app.use(express.json());//this is to accept data in json format
app.use(express.urlencoded());// this is to decode data to send through html form
let products = [];

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'products-add.html'));
});

app.post('/add-product', (req, res) => {
    console.log(req.body);//the data we get is in the body of request
    const productName = req.body.productName;
    const productPrice = req.body.productPrice;
     res.sendFile(path.join(__dirname, 'public', 'products.html'), {
        productName,
        productPrice,
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
