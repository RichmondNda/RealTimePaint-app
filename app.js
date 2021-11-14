const express = require('express')
const app = express()



//middlewares
app.use(express.static('public'))



//Listen on port 3000
server = app.listen(3000)

const io = require("socket.io")(server)

    
    //listen on every connection
    // io.on('connection', (socket) => {
          
    // });


    io.on('connection', (socket) => {
        console.log("client connecter")
        
        socket.on('mouse', (data) => {
            socket.broadcast.emit('painter', data);
            
        });

        socket.on('clear', () => {
            socket.broadcast.emit('clear');
            socket.emit('clear');
        });

        socket.on('undo', () => {
            socket.broadcast.emit('undo');
            socket.emit('undo');
        })

    })

    

