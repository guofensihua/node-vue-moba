const express = require('express');
const router = express.Router();
const path = require('path');
const assert = require('http-assert');
const jwt = require('jsonwebtoken');
const AdminUser = require('../../models/AdminUser');

const authMiddleware = require('../../middleware/auth');
const resourceMiddleware = require('../../middleware/resource');

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
    app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router);

    // 处理图片上传
    const multer = require('multer');
    const upload = multer({ dest: path.join(__dirname, '/../../uploads') });

    app.post('/admin/api/upload', authMiddleware(),upload.single('file'), (req, res) => {
        const file = req.file;
        file.url = `http://localhost:3000/uploads/${file.filename}`;
        res.send(file);
    })

    // 登录
    app.post('/admin/api/login', async (req, res) => {
        const { username, password } = req.body;
        const user = await AdminUser.findOne({ username }).select('+password');

        assert(user, 422, '用户不存在哦');

        if (user) {
            let isValid = require('bcryptjs').compareSync(password, user.password);
            if (isValid) {
                const token = jwt.sign({ id: user._id }, app.get('secret'));
                res.send({ token });
            } else {
                res.status(422).send({
                    message: '密码错误'
                })
            }
        }
    })

    // 统一错误处理
    app.use((err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })
}