const express = require('express');
const router = express.Router();

module.exports = app => {
    router.post('/', async (req, res) => {
        const model = await req.Model.create(req.body);
        res.send(model);
    });
    router.get('/', async (req, res) => {
        const queryOptions = {};
        if (req.Model.modelName === 'Category') {
            queryOptions.populate = 'parent';
        }
        const items = await req.Model.find().setOptions(queryOptions).limit(10);
        res.send(items);
    });
    router.get('/:id', async (req, res) => {
        const item = await req.Model.findById(req.params.id);
        res.send(item);
    });
    router.put('/:id', async (req, res) => {
        const item = await req.Model.findByIdAndUpdate(req.params.id, req.body);
        res.send(item);
    })
    router.delete('/:id', async (req, res) => {
        await req.Model.findByIdAndDelete(req.params.id);
        res.send({
            success: true,
        })
    })
    app.use('/admin/api/rest/:resource', (req, res, next) => {
        const resourceName = require('inflection').classify(req.params.resource);
        req.Model = require(`../../models/${resourceName}`);
        next();
    }, router);
}