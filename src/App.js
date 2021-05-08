import React, {useState, useEffect} from 'react';
import Message from './components/Message';
import FlipMove from 'react-flip-move';
import { FormControl, IconButton, Input, InputLabel } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import './App.css';
import axios from './components/axios';
import Pusher from 'pusher-js';

const pusher = new Pusher('639703e137123e691dd9', {
  cluster: 'ap1'
});

function App() {
  const [ text, setText ] = useState('');
  const [messages, setMessages] = useState([]);
  const [ user, setUser ] = useState('haha');

  

  const sync = async () => {
    await axios.get('/retrieve/conversation')
      .then((res) => {
        //console.log(res.data);
        setMessages(res.data)
      })
  }

  useEffect(() => {
    sync();
  }, [])

  useEffect(() => {
    const channel = pusher.subscribe('messages');
    channel.bind('newMessage', function(data) {
      sync()
    })
  }, [user])

  //prompt user input
  useEffect(() => {
    setUser(prompt('Input your name?'));
  }, []);
  
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('/save/message', {
      user: user,
      text: text,
      timestamp: Date.now()
    })
    setText('');
  }

  return (
    <div className="messanger">
      <h1 className="messanger-header">Messenger</h1>
      <form className="messanger-form" onSubmit={handleSubmit}>
        <FormControl className="messanger-formControl" >
          <InputLabel>Send a message</InputLabel>
          <Input  value={text} onChange={event => setText(event.target.value)} />
          <IconButton disabled={!text} type="submit" variant="contained" color="primary">
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>
      <div className="messanger-body">
      <FlipMove>
        
          {
            messages.map(message => (
                  <Message key={message._id}  user={user} message={message} />
            ))
          }
        
        
      </FlipMove>
      </div>
      
    </div>
  );
}

export default App;
