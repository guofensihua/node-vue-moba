module.exports = options => {
    return async (req, res, next) => {
        const jwt = require('jsonwebtoken');
        const assert = require('http-assert');
        const AdminUser = require('../models/AdminUser');

        const token = (req.headers.authorization || '').split(' ').pop();
        assert(token, 401, '请先登录');
        let id;
        try {
            const result = jwt.verify(token, req.app.get('secret'));
            id = result.id;
        } catch (error) {
            res.status(401).send({ message: '畸形的token' })
        }
        assert(id, 401, '请先登录');
        const user = await AdminUser.findById(id);
        assert(user, 401, '请先登录');
        next();
    }
}