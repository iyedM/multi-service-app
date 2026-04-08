const express = require('express');
const router = express.Router();

let items = [
    { id: 1, name: 'First Item', description: 'This is the first item' },
    { id: 2, name: 'Second Item', description: 'This is the second item' },
];

router.get('/', (req, res) => {
    res.json(items);
});

router.post('/', (req, res) => {
    const { name, description } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'Name is required' });
    }
    const newItem = {
        id: items.length + 1,
        name,
        description: description || ''
    };
    items.push(newItem);
    res.status(201).json(newItem);
});

module.exports = router;
