//Node server is for handling socket request

const io = require('socket.io')(8000, {cors: {origin: "*"}});//we have initialised socket.io and it is running on port 8000

const users ={};
//io.on is an instance which will listen to multiple socket.io connections for example sid , saksham, kanak, poorvi are connected over a chat app so it will handle all these 4 socket connections
//socket.on handles a particular conncetion
io.on('connection', socket =>{
    console.log('New user connected')
    socket.on('new-user-connected', username=>{
        console.log("New user joined", username)
        users[socket.id] = username;
        //jo user join hua h use chodke baaki sabke pass message jayega that a new user has joined
        socket.broadcast.emit('user-connected', username);
        
    })
//jab user send pr click krke ek message bhejega to baaki sbko message receive hga
     socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, username: users[socket.id]})
        
        //jab user disconnect hoga to baaki sbko message receive hoga ki user disconnect hgya
       
})
socket.on('disconnect', message =>{
    socket.broadcast.emit('left', users[socket.id])
    delete users[socket.id]
    })
})
