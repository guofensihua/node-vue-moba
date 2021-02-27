const express = require('express');
const router = express.Router();

module.exports = app => {
    router.post('/categories', async (req, res) => {
        const Category = require('../../models/Category.js');
        const model = await Category.create(req.body);
        res.send(model);
    });
    router.get('/categories', async (req, res) => {
        const Category = require('../../models/Category.js');
        const items = await Category.find().limit(10);
        res.send(items);
    })
    app.use('/admin/api', router);
}