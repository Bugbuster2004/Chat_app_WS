const socket = io('http://localhost:8000')

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInput');
const messageContainer = document.querySelector(".container")
const chatcontainer = document.querySelector(".notification")

const append =(message, position) =>{
    const messageElement = document.createElement('div')
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement)
    //noti element
 


}

const appendnoti = (message) =>{
    const notiElement = document.createElement('div')
    notiElement.innerText = message;
    notiElement.classList.add('noti');
    chatcontainer.append(notiElement)
    // const notiElement = document.createElement('div');
    // notiElement.innerText = message;
    // notiElement.classList.add('noti');
    // notiElement.classList.add(position);
    // chatcontainer.append(notiElement);
}

form.addEventListener('submit', (e) =>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right')
    socket.emit('send', message)
    messageInput.value = '';
})

const username = prompt("Enter your name to join the chat");
// socket.emit sends the index.js the value that this user has entered and simply run the function emit means frontend se backend me bhejna kisi chiz ko
socket.emit('new-user-connected',username);


socket.on('user-connected', username =>{
      append(`${username} joined the chat`, 'right')
    //   append(`${username}`,'left')
})

socket.on('user-connected', username =>{
    appendnoti(`${username}`);
    //   append(`${username}`,'left')
})

//now we want the data sent by us to be recieved by the other persons in the chat box
socket.on('receive', data =>{
    append(`${data.username}:${data.message}`, 'left')
})

socket.on('left', username =>{
    append(`${username} left the chat`,'left')
})