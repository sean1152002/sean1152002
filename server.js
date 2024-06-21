const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/products', (req, res) => {
    const products = [
        { id: 1, name: "智能手机", price: 2999 },
        { id: 2, name: "笔记本电脑", price: 5999 },
        { id: 3, name: "无线耳机", price: 799 },
        { id: 4, name: "智能手表", price: 1599 }
    ];
    res.json(products);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});