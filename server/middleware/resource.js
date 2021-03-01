module.exports = options => {
    return (req, res, next) => {
        const resourceName = require('inflection').classify(req.params.resource);
        req.Model = require(`../models/${resourceName}`);
        next();
    }
}