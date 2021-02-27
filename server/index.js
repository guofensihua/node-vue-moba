const express = require('express');

const app = express();
app.use(require('cors')());
app.use(express.json());

require('./plugins/mongodb.js')(app);
require('./routes/admin')(app);

app.listen(3000, () => {
    console.log('服务器已启动在3000端口')
})