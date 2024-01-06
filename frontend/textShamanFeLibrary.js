// Our Aim is to use jQuery with Node.js: We can use jQuery in Node.js using the jquery module. 
// Note: Use the ‘jquery’ module not the ‘jQuery’ module as the latter is deprecated.

// Since jQuery is a frontend JavaScript Library, it needs to have a window with a 
// document to work in the backend. ‘jsdom’ is a library that is used to parse and 
// interact with the HTML. It is not exactly a web browser but mimics one. 


const jsdom = require('jsdom')

const dom = new jsdom.JSDOM("")

const jquery = require('jquery')(dom.window)