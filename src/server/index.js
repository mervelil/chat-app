var express=require('express')
const app=express();
const http=require('http');
const cors=require("cors");
const {Server}=require('socket.io');

//var io = require('../lib/socket.io');
// const { Server } = require("socket.io");
// const app2 = express();
// let port = process.env.PORT || 8080;
// const server = http.createServer(app2);
// server.listen(port, () => console.log("App listening at localhost:" + port));
// http.listen(port, () => console.log(`Listening on port ${port}`));
// ReactDOM.render(<App />, document.getElementById("root"));

app.use(cors());
const server=http.createServer(app);
const io=new Server(server,{
    cors:{
        origin:"htpp://localhost:3000",
        methods:["GET","POST"],
    },
});

io.on('connection',(socket)=> {
    console.log('a user connected');
    socket.on('chat message', ()=>{
       console.log(' message: '+JSON.stringify(msg));
       io.emit('chat message',msg);
      });
    
  });

app.listen(3001,function () {
    console.log('listening on  *:3001');
});