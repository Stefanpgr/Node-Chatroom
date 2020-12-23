

const chatForm = document.getElementById('chat-form')
const chatMessages = document.querySelector('.chat-messages')
const socket = io()

// Message

socket.on('message', message => {
    console.log(message)
    outPutMessage(message)
})
// Submit Message

chatForm.addEventListener('submit', (e) => {
    e.preventDefault()

    // Get message text
    let msg = e.target.elements.msg.value
   
   // Emit message to server
    socket.emit('chatMessage', msg)

    // Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight
    // clear input
    e.target.elements.msg.value = ''
    e.target.elements.msg.focus()
})

// Output message to DOM

const outPutMessage = (message) => {
    const div = document.createElement('div')
    div.classList.add('message')
    div.innerHTML = `	<p class="meta">Stefan <span>9:12pm</span></p>
    <p class="text">
       ${message}
    </p>`

    document.querySelector('.chat-messages').appendChild(div)
}
