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
            // console.log(data)
            socket.broadcast.emit('painter', data);
            
        });

    })

    

