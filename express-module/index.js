const express = require('express');
const app = express();
const Joi = require('joi');
// Joi is a api request POST validator

app.use(express.json());

port = process.env.PORT || 3000;

/*
app.get()
app.post()
app.put()
app.delete()

http methods with express
*/

const friends = [
    { id: 1, name:'michael scott' },
    { id: 2, name:'dwight schrute' },
    { id: 3, name:'jim halpert' }
];



// GET 


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

app.get('/friends', (req,res)=> {
    res.send(friends);
});

app.get('/friends/:id',(req,res) => {
    const friend = friends.find(c => c.id === parseInt(req.params.id));
    if(!friend) {
        res.status(404).send('no id found');
    }
    else {
        res.send(friend);
    }
});


app.get('/posts/:year/:month/',(req,res)=> {
    res.send(req.params);
});

// queries
app.get('/posts/:id',(req,res)=> {
    res.send(req.query);
});



// POST

app.post('/friends',(req,res)=> {

    

    // !warning: refactoring required to handle complex schema
    // using function validateReq()
    /*
    const schema = {
        name: Joi.string().min(3).required() // min 3 characters, required for POST
    };

    const result = Joi.validate(req.body, schema);
    console.log(result);
    */

    // without object destructuring
    
    const result = validateReq(req.body);
    
    // if invalid, return 400 - bad req
    
    if(result.error) {
       // 400 BAD REQ
       res.status(400).send(result.error);
    }
    
    const friend = {
        id: friends.length + 1,
        name: req.body.name // enable parsing with middle-ware LINE 4
        // input validation IS IMPORTANT
    };
    friends.push(friend);
    res.send(friend);
});

// node package for input validation: NPM JOI





// PUT

app.put('friends/:id',(req,res)=> {
    // look up friends
    // if not existing, return 404
    const friend = friends.find(c => c.id === parseInt(req.params.id));
    if(!friend) {
        res.status(404).send('no id found');
    }
    else {
        res.send(friend);
    }


    // validate
    // !warning: refactoring required to handle complex schema
    // using function validateReq()
    /*
    const schema = {
        name: Joi.string().min(3).required() // min 3 characters, required for POST
    };

    const result = Joi.validate(req.body, schema);
    console.log(result);
    */

    // with object destructuring
    const {error} = validateReq(req.body);
    // if invalid, return 400 - bad req
    if(error) {
        // 400 BAD REQ
        res.status(400).send(result.error);
        return;
    }

    // update friends
    friend.name = req.body.name
    // return updated friends
    res.send(friend);
});


// function to validate schemas

function validateReq(friend) {
    
    const schema = Joi.object({
        name: Joi.string().min(3).required() 
    });
    return schema.validate(friend, schema);
} 
