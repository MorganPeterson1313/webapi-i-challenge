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

 });



 server.post('/users',(request, response) => {
            const userInfo = request.body;
            db.insert(userInfo)
            .then(user => {
                response.status(201).json({success:true, user});
            })
            .catch(err =>{
                response.status(500).json({success:false, err});
            });

 });

 server.delete('/users/:id', (request, response) => {
            const {id} = request.params;
            db.remove(id)
            .then(deleted => {
                if(deleted) {
                    response.status(204).end();
                }else{
                    response.status(404).json({success:false, message:'the user you are looking for is not here'})
                }
            })
            .catch(err => {
                response.status(500).json({success:false, err})
            });
        });


 server.put('/users/:id', (request, response) => {
                const {id} = request.params;
                const userInfo = request.body;
            const {name, bio} = userInfo

            if(name && bio){
                db.update(id ,userInfo)

                .then(updated => {
                    if (updated){
                    response.status(200).json(userInfo);
                    }else {response.status(404).json({success:false, message:'the user you are looking for is not here'})
                }
                })
                .catch(err => {
                    response.status(500).json({success:false, err})
                });
            }

                else {
                    res
                      .status(400)
                      .json({ errorMessage: "Please provide name and bio for the user." });
                  }
                });

 
server.get('/users/:id', (request, response) => {
    const {id} = request.params;
    db.findById(id)
    .then(user => {
        response.status(200).json(user)

    })
    .catch(err => {
        response.status(500).json({success:false, err})
    });

})



server.listen(4000, ()=> {

console.log('server listening on port 4000');


});