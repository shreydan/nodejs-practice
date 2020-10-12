/*
Programming with MOSH
video: https://www.youtube.com/watch?v=TlB_eWDSMt4

next video:  https://www.youtube.com/watch?v=pKd0Rpw7O48
*/




function hello() {
    console.log('is this what the node is like?!');
}
// hello();
// console.log(window);
/* 
global objects:
console.log()
setTimeout()
setInterval()
clearInterval() 
*/

var message = 'hey'; // <-- not part of global object

/*
console.log(message); // <-- hey ----output
// global.console.log <-- global object or use shorthand above
console.log(global.message); // undefined output since not part of global object

// functions are a part of global scope

// AVOID DECLARING FUNCTIONS AND VARIABLES IN GLOBAL OBJECT
// RATHER USE SMALLER OBJECTS CALLED - MODULES!
// APP.JS IS MAIN MODULE
*/


// to load a module
// var logger = require('./logger'); // the var gets the object
// use CONST to define the obj to avoid over-writing accidentally
// const logger = require('./logger') //also no need for '.js' at the end, its automatically understood

// console.log(module);
// every .js file is a module and its chilren functions and variables are limited to its scope

// console.log(logger);

// time to use the logger obj

/*
logger.log('this is a message');
console.log(logger.endPoint);
// yep got it
*/

// M O D U L E S

// USING PATH
const path = require('path');
var pathObj = path.parse(__filename);
console.log(pathObj);

// USING OS
const os = require('os');
// cool ES6 example - template strings
console.log(`total memory: ${os.freemem()}`);
console.log(`uptime: ${os.uptime()}`);


// USING FILESYSTEM module
const fs = require('fs');

// has both async and sync objects -- use async always
const files = fs.readdirSync('./');
console.log(files);

// async form:
const filesasync = fs.readdir('./', function(err,files) {

        if(err)
            console.log('error: ', err);
        else
            console.log('result: ', files);

});



// USING EVENTS
// class: EventEmitter <-- important

// first letter is capital + camel case -- means its a class to denote it to others properly
const EventEmitter = require('events');
const emitter = new EventEmitter(); 
//obj of EventEmitter class

/*
IMPORTANT:: Listener is always invoked before the emitter
*/

// create listener
// emitter.addListener OTHERWISE:
emitter.on('message logged', function() {
    console.log('im listening');
});


emitter.emit('message logged');
// emit: make noise, produce signal
// nothing happens when there is no listener to the emitter



// EVENT ARGUMENTS

// first argument has to be SAME, its like the name to refer
emitter.on('message with args', function(e) {
    console.log('here is ur args object: ', e);
});
emitter.emit('message with args', {id: 1, url: 'https://' });

// USING ES6 soooo arrow functions:
emitter.on('look es6', (e) => {
    console.log(e.message);
});
emitter.emit('look es6', {message: 'look ma I am using ES6!'});







// BACK TO LOGGER.JS BUT THIS TIME USING EVENT EMITTERS!!!
/*
const EventEmitter = require('events');
const emitter = new EventEmitter(); 

NO NEED TO DEFINE THESE HERE --- THEY'RE ALWAYS
SUPPOSED TO BE IN THEIR OWN MODULES WHERE THE CLASS
EXTENDS THE EventEmitter Class and;
that class and class obj are created here!
*/


const Logger = require('./logger');
const logger = new Logger();


logger.on('logger', (e)=>{
    console.log('logger works: ', e);
});
logger.log('this is the messageeeee');

// emitter is in logger.js WHERE IT IS SUPPOSED TO BE























// HTTP MODULE

const http = require('http');

// this server is an event emitter coz it extends from net.Server
const server = http.createServer((req,res) => {
    if(req.url === '/') {
        res.write('hello world');
        res.end();
    }
    if(req.url === '/api/courses') {
        res.write(JSON.stringify([1,2,3]));
        res.end();
    }
});


server.listen(3000);
console.log('listening on port 3000');
