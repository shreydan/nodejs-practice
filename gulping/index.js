const express = require('express');
const app = express();

port = process.env.port || 3000;

app.use(express.static('public/home'));

app.listen(port, ()=> {
    console.log(`listening at ${port}`);
});