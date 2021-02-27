const express = require('express');
const app = express();
const path = require('path');

app.use(require('cors')());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

require('./plugins/mongodb.js')(app);
require('./routes/admin')(app);

app.listen(3000, () => {
    console.log('服务器已启动在3000端口')
})