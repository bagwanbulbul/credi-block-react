const users    = require("./routes/user");
const chats    = require("./routes/chat");
const message  = require("./routes/message");
const express  = require('express');
const app      = express();
const http     = require('http');
const server   = http.createServer(app);
var bodyParser = require('body-parser')
const cors     = require('cors')
const colors   = require('colors')
const dotenv = require("dotenv");

dotenv.config();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())


//database connection
const mongoose = require('mongoose')

mongoose
  .connect('mongodb+srv://roshan:user12@cluster0.uoxgo.mongodb.net/credit-block?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => {
    console.log('Connected to the Database successfully'.yellow.bold);
  }).catch((err) => {
    console.log(err);
  }) 



app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/', users);
app.use('/chat',chats);
app.use('/message',message);





//server connection
 server.listen(3111, () => {
  console.log("server is listning on port",process.env.PORT.blue.bold);
});

 const io = require("socket.io")(server,{
   cors:{
     origin:"http://localhost:3000"
   }
 });

 io.on("connection",(socket) => {
   console.log("connected to socket.io")
   socket.on("setup",(userData) => {
     //socket.join(userData.data._id);
     //console.log(userData.data._id);
    socket.emit("connected")
   })

   socket.on("Join chat",(room) => {
     socket.join(room);
     console.log("User joined room" + room);
   })

   socket.on("new message",(newMessageRecieved) => {
    var chat = newMessageRecieved.data.chat
    if(!chat.users) return console.log("chat user not defined")
     chat.users.forEach((user) => {
      //  console.log("user",user)
      if (user._id == newMessageRecieved.data.sender._id) return 
              socket.in(user._id).emit("message recieved", newMessageRecieved);
    });         
   })
 })