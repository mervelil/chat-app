import * as React  from  'react';
import {makeStyles} from '@mui/styles';
import { Theme } from '@mui/styles';
import Paper from '@mui/material/Paper';
import { ThemeProvider } from "@mui/material/styles";
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Chip from   '@mui/material/Chip';
import  Button  from '@mui/material/Button';
import  TextField from '@mui/material/TextField';
import  ListItemText from '@mui/material/ListItemText';
import { padding } from '@mui/system';
import { CTX } from './Store';
 const useStyles =makeStyles(theme =>({
     root :{
    background: 'black',
    margin:'50px',
      
   },
   flex: {
    display:'flex',
    alignItems:'center'
   },
   topicsWindow:{
        width:'30%',
        height:'300px',
        borderRight:'1px solid grey'
   },
   chatWindow:{
        width:'70%',
        height:'300px',
        padding:'20px'
   },
   chatBox:{
    width:'85%',
   
   },
  button:{
        width:'15%'
   }
 })); 
// const useStyles=makeStyles((theme:Theme)=>({

//     root:{
//         background: 'black',
//         padding:theme.spacing(3),
//     },

// }));
export default function Dashboard () {
    const classes =useStyles();
    const {allChats,sendChatAction,user}=React.useContext(CTX);
    const topics=Object.keys(allChats);
    const [activeTopic,changeactiveTopic]=React.useState(topics[0])
    const [textValue,changeTextValue]=React.useState('');
  
    return (
    <div>
     
        <Paper className={classes.root}>
        <Typography variant="h4" component ="h4">
    Chat App
        </Typography>
        <Typography variant="h5" component ="h5"
        >
       {activeTopic}
        </Typography>
        <div className={classes.flex}>
            <div className={classes.topicsWindow}>
                <List>
                   {
                       topics.map(topic=>(
                            <ListItem onClick={e=>changeactiveTopic(e.target.innerText)} key={topic} button>
                        <ListItemText primary={topic}>
                            </ListItemText>
                       
                   </ListItem>
                        ))
                   } 
               
                </List>
            </div>
            <div className={classes.chatWindow}>
          
                   {
                        allChats[activeTopic].map((chat,i)=>(
                            <div className={classes.flex} key={i}>
                                <Chip label={chat.from} className={classes.chip}/>
                                <Typography variant='p'>{chat.msg}</Typography>
                                </div>
                        ))
                   } 
               
           </div>
        </div>
        <div className={classes.flex}>
            <TextField
             id='standart-name' label="Send a chat"
             className={classes.chatBox}
            value={textValue}
            onChange={e=>changeTextValue(e.target.value)}
             margin="normal"
            />
            <Button variant="contained" 
             color="primary"
             className={classes.button}
             onClick={()=>{
                sendChatAction({from:user,msg:textValue,topic:activeTopic});
                changeTextValue('');
             }}
             >
                  Send
            </Button>
        </div>
        </Paper>
    </div>
    )
}