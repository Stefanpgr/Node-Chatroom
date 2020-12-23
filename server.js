const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require("socket.io")
const app = express()
const server = http.createServer(app)
const io = socketio(server)

//static folder
app.use(express.static(path.join(__dirname, 'public')))


//runs on client connect
io.on('connection', socket => {
    socket.emit('message', 'Welcome to Chatroom')

    // Broadcast when a user connects
    socket.broadcast.emit('message', 'A user has joined the chat')

    // Runs when a client disconnects
    socket.on('disconnect', () => {
        io.emit('message', 'A user has left the chat')
    })

    // Listen for chat message
    socket.on('chatMessage', msg => io.emit('message', msg))
})

const PORT = 3000 || process.env.PORT

server.listen(PORT, ()=> console.log(`server is running at ${PORT}`))