// implement your API here
const express = require('express');
const db = require('./data/db')

const server = express();
server.use(express.json());

server.get('/', (request, response) => {

response.send('hello world from express');

});

server.get('/now', (request, response) =>{
const now = new Date().toISOString();
    response.send(now);
    
    });

    server.get('/users', (request, response) => {
        db.find()
        .then(users => {
            response.status(200).json(users);
        })
        .catch(err => {
            response.status(500).json({success:false,err})
        });

 })



 

server.listen(4000, ()=> {

console.log('server listening on port 4000');


});