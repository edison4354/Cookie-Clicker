const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static('static'));

// Keep track of users
let users = {};

io.on("connection", (socket) => {
    console.log("User has connected");

    // Save new user to app
    socket.on('new user', (username) => {
        //Save the username as key to access the user's socket id
        users[username] = socket.id;
        //Save the username to socket as well
        socket["username"] = username;
        console.log(`${username} has joined the game!`);
        io.emit("new user", username);
    })

    socket.on('cookie click', () => {
        // If this is the first click, set clicks property
        if (!("clicks" in socket.data)) {
            socket.data["clicks"] = 1;
        } else {
            // Increment total clicks
            socket.data["clicks"] += 1;
        }
        socket.emit('cookie click', socket.data.clicks);
        console.log(`${socket.username} has ${socket.data.clicks} clicks`);
    })
});

app.get('/', (req, res) => {
    res.render('static/index.html');
})
  
server.listen('3000', () => {
    console.log('Server listening on Port 3000');
})
