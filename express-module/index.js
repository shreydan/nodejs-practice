const express = require('express');
const app = express();

port = process.env.PORT || 3000;

/*
app.get()
app.post()
app.put()
app.delete()

http methods with express
*/

app.get('/',(req,res) => {
    res.send('hello world');
}); // callback function: route handler

app.get('/about',(req,res)=>{
    res.send("I'm shreyas daniel and you're watching disney xd");
});


app.listen(port, ()=>{
    console.log(`listening to express--basics app at port: ${port}`);
});

// get specific data from a get route

app.get('/friends/:id',(req,res) => {
    res.send(req.params.id);
});

app.get('/posts/:year/:month/',(req,res)=> {
    res.send(req.params);
});

// queries
app.get('/posts/:id',(req,res)=> {
    res.send(req.query);
});