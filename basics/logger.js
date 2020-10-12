var url = 'http://mylogger.io/log';

const EventEmitter = require('events');

class Logger extends EventEmitter {
    log(message) {
        // send HTTP req
        console.log(message);
    
        this.emit('logger', {message});
    }
}


// above funtion and var is private to looger.js ONLY
// to be accessible by app.js, make it public via 'exports'

//module.exports.log = log; // log object -> log function
module.exports.endPoint = url; // endPoint obj -> url var
// can also be written as:
// exports.log = log;
// SEE Module Wrapper Function below:
// its one of the methods available with IIFE

/*
node doesn't run a js module directly
it wraps it inside an "IIFE"
Immediately Invoked Function Expression

like this:

(funtion(exports, require, module, __filename, __dirname) {

    function example(params){

    }
    module.exports.name = example;

});

the above wrapper function is module wrapper function
notes:
require - local not global -- for every module




console.log(__filename);
console.log(__dirname);

*/

module.exports = Logger;