const express = require('express');
const app = express();

port = process.env.PORT || 3000;

app.use(express.static('public/home'));

app.listen(port,()=> {
    console.log(`listening on port: ${port}`);
});