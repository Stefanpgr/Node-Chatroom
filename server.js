const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require("socket.io")
const formatMessage = require('./utils/messages')
const {userJoin, getCurrentUser} = require('./utils/users')



const app = express()
const server = http.createServer(app)
const io = socketio(server)

//static folder
app.use(express.static(path.join(__dirname, 'public')))

const botName = 'Chatcon Bot'
//runs on client connect
io.on('connection', socket => {
socket.on('joinRoom', ({ username, room}) => {

    const user = userJoin(socket.id,username,room)



    socket.join(user.room)
    socket.emit('message', formatMessage(botName, 'Welcome to Chatroom'))

    // Broadcast when a user connects
    socket.broadcast.to(user.room).emit('message', formatMessage(botName,  `${user.username} joined the chat`))

})
   
    // Listen for chat message
    socket.on('chatMessage', msg => {
        const user = getCurrentUser(socket.id)
        io.to(user.room).emit('message',formatMessage(user.username, msg))
})
     // Runs when a client disconnects
     socket.on('disconnect', () => {
        io.emit('message',formatMessage(botName, 'A user has left the chat'))
    })

})

const PORT = 3000 || process.env.PORT

server.listen(PORT, ()=> console.log(`server is running at ${PORT}`))