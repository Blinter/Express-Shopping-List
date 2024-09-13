const Item = require('../item');
const express = require('express');
const router = express.Router();

router.post('', (req, res, next) => {
    try {
        return res.json({ added: new Item(req.body.name, req.body.price) });
    } catch (err) {
        return next(err)
    }
});

router.get('', (req, res, next) => {
    try {
        return res.json({ items: Item.getAll() });
    } catch (err) {
        return next(err)
    }
});

router.get('/:name', (req, res, next) => {
    try {
        return res.json({ item: Item.get(req.params.name) });
    } catch (err) {
        return next(err)
    }

});

router.patch('/:name', (req, res, next) => {
    try {
        return res.json({ updated: Item.update(req.params.name, req.body) });
    } catch (err) {
        return next(err)
    }
});

router.delete('/:name', (req, res, next) => {
    try {
        Item.remove(req.params.name);
        return res.json({ message: 'Deleted' });
    } catch (err) {
        return next(err)
    }
});

module.exports = router;
