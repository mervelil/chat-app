import React from "react";
import io from 'socket.io-client';
const socket2=io.connect("http://localhost:3001");
export const CTX=React.createContext();
const initState= {
  general:[
    {from:'aaron',msg:'hello'}, 
    {from:'arnold',msg:'hi'},
    {from:'alice',msg:'bye'},
  
  ],
  topic2:[
      {from:'aaron',msg:'hello'}, 
    {from:'arnold',msg:'hi'},
    {from:'alma',msg:'bye'},
  ]
}
function reducer(state,action) {
  const {from,msg,topic}=action.payload;
    switch (action.type) {
        case 'RECEIVE_MESSAGE':
            
          return{
                ...state,
                [topic]:  [
                //    ...state[action.payload.topic] , same as
                  ...state[topic] ,
                    {
                     from,
                      msg
                    }
                ]
          }
    
        default:
           return state
    }
}

let socket;

function sendChatAction(value) {
  socket.emit('chat message',value);
}

export default function Store(props) {
  const [allChats,dispatch] =React.useReducer(reducer,initState);
  
   if(!socket) {
     socket=io(':3001')
     socket.on('chat message',function(msg){
      dispatch({type:'RECEIVE_MESSAGE',payload:msg});
    });

   }
   const user= 'aaron'+Math.random(100).toFixed(2); 
 
 
    return (
      <CTX.Provider value= {{allChats,sendChatAction,user}} >
{props.children}
      </CTX.Provider>
    )

    }
