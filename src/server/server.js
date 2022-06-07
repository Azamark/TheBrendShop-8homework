const express = require('express');
const fs = require('fs');
const cartRouter = require('./cartRouter');
const app = express();
const path = require('path');



app.use(express.json());
app.use('/', express.static(path.resolve(__dirname, '../public')));
app.use('/api/cart', cartRouter);

const catalogJSONPath = path.resolve(__dirname, './db/products.json');
const ordersJSONPath = path.resolve(__dirname, './db/orders.json');

app.get('/api/products', (req, res) => {
    fs.readFile(catalogJSONPath, 'utf-8', (err, data) => {
        if (err) {
            res.send(JSON.stringify({ result: 0, text: err }));
        } else {
            res.send(data);
        }
    });
});

app.post('/api/orders/', (req, res) => {
    console.log(1);
    fs.readFile(ordersJSONPath, 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
        } else {
            const newOrder = JSON.parse(data);
            newOrder.push(req.body);
            console.log(newOrder);
            fs.writeFile(ordersJSONPath, JSON.stringify(newOrder, null, 4), 'utf-8', (err) => {
                if (err) {
                    res.send('{"result": 0}');
                } else {
                    res.send('{"result": 1}');
                }
            })
        }
    });
});

const port = 5555;

app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});

// app.get(); // READ
// app.post(); // CREATE
// app.put(); // UPDATE
// app.delete(); // DELETE

