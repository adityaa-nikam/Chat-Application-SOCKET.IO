// NODE SERVER WHICH WILL HANDLE SOCKET IO CONNECTIONS

const io = require('socket.io')(8000,{
    cors: {
        origin: "http://127.0.0.1:5500",
        methods: ["GET", "POST"]
    }
})
const users = {};
io.on('connection', socket => {
    socket.on('new-user-joined', name => {
        console.log('New user joined:', name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
        // console.log(users);
    });

    socket.on('send', message =>{
        console.log('Message sent on server:', message);
        socket.broadcast.emit('receive',{message: message, name: users[socket.id]})
        console.log('Message broadcasted on recieve :', message);
    });
    socket.on('disconnect', message => {
        console.log('User disconnected:', users[socket.id]);
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
}) 