const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

const menuFile = './menu.json';

app.get('/menu', (req, res) => {
    fs.readFile(menuFile, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error loading menu.');
        res.json(JSON.parse(data));
    });
});

app.post('/menu', (req, res) => {
    const { item } = req.body;
    fs.readFile(menuFile, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error loading menu.');
        const menu = JSON.parse(data);
        const existingIndex = menu.findIndex(d => d.name === item.name);
        if (existingIndex >= 0) menu[existingIndex] = item;
        else menu.push(item);
        fs.writeFile(menuFile, JSON.stringify(menu, null, 2), err => {
            if (err) return res.status(500).send('Error updating menu.');
            res.status(200).send('Menu updated.');
        });
    });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

