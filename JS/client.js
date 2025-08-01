 const socket = io('http://localhost:8000');
// const socket = io('http://10.185.184.204:8000');
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");

var audio = new Audio('ting.mp3');

const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left'){
        audio.play();
    }
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`,'right');
    socket.emit('send', message);
    console.log("sending message "+message);
    messageInput.value = ''
})
const name = prompt("Enter your name to join");
socket.emit('new-user-joined',name)

socket.on('user-joined', name =>{
    append(`${name} joined the chat`, 'left')
}) 

socket.on('receive', message =>{
    console.log("message received on client: ", message);
      append(`${message.name}: ${message.message}`, 'left')
}) 
socket.on('left', name =>{
    append(`${name} left the chat`, 'left')
})