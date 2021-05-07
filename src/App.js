import React, {useState, useEffect} from 'react';
import Message from './components/Message';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import { Button, FormControl, IconButton, Input, InputLabel } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import './App.css';
import db from './components/firebase';

function App() {
  const [ text, setText ] = useState('');
  const [messages, setMessages] = useState([]);
  const [ user, setUser ] = useState('haha');

  const login = () => {
    return setUser(prompt('Input your name?'));
  };
  useEffect(() => {
    login()
  }, []);
  
  useEffect(() => {
    db.collection('messages')
    .orderBy('timestamp', 'desc')
    .onSnapshot(snapshot => {
      setMessages(snapshot.docs.map(doc =>({ id: doc.id, data:doc.data()})))
    })
    
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();

    db.collection('messages').add({
      text: text,
      user: user,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    //setMessages([...messages, {user: user, text: text}]);
    setText('');
  }
  return (
    <div className="messanger">
      <h1>Messenger</h1>
      <form className="messanger-form" onSubmit={handleSubmit}>
        <FormControl className="messanger-formControl" >
          <InputLabel>Send a message</InputLabel>
          <Input  value={text} onChange={event => setText(event.target.value)} />
          <IconButton disabled={!text} type="submit" variant="contained" color="primary">
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>
      <FlipMove>
        {
          messages.map(({id, data}) => (
                <Message key={id} user={user} message={data} />
          ))
        }
      </FlipMove>
      
      
    </div>
  );
}

export default App;
