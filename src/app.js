const path = require('path');
const express = require('express');
const morgan = require('morgan');
const app = express();
const mongoose = require('mongoose');

// connection to db
mongoose.connect('mongodb://localhost/crud-mongo')
  .then(db => console.log('db connected'))
  .catch(err => console.log(err));

// importing routes
const indexRoutes = require('./routes/index');
// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'))

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}))
// routes
app.use('/', indexRoutes);

server=app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});

const io = require("socket.io")(server) //socket io implement edilir ve server

io.on('connection', (socket) => {
    console.log("New user connected")

    //default username
    socket.username = "Anonymous"

    //listen on change_username
    socket.on("change_username", (data) => {
        console.log(socket.username + " changed name as " + data.username)
        socket.username = data.username
    })

    //listen on new_message
    socket.on("new_message", (data)=>{
        console.log(socket.username + " is said " + data.message)
        //broadcast the new message
        io.sockets.emit("new_message", {message : data.message, username : socket.username})
    })
})