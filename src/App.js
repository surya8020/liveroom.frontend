import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Lobby from './components/lobby'
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import { useState } from 'react'
import Chat from './components/chat'

const App = () => {
  const [connection, setConnection] = useState();
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState();
  const [user, setUser] = useState();
  const joinRoom = async (user, room) => {
    try {
      // connect to hub
      const connection = new HubConnectionBuilder()
        .withUrl('https://live-room-surya-f512dfcb58bc.herokuapp.com/chat') // 'https://localhost:7064/chat'
        .configureLogging(LogLevel.Information)
        .build();
      // handler
      connection.on('RecieveMessage', (user, message) => {
        setMessages(messages => [...messages, { user, message }]);
      });
      // start connection and invoke join room from our server
      await connection.start();
      await connection.invoke("JoinRoom", { user, room });
      setConnection(connection);
      setRoom(room);
      setUser(user);
    } catch (e) {
      console.log(e)
    }
  }

  const sendMessage = async (message) => {
    console.log(message)
    try {
      await connection.invoke("SendMessage", { user, room, message })
    } catch (e) {
      console.log(e)
    }
  }

  return <div className='app'>
    <h2>My Chat</h2>
    <hr className='line' />
    {!connection ? <Lobby joinRoom={joinRoom} /> : <Chat messages={messages} sendMessage={sendMessage} curUser={user} />}
  </div>
}

export default App;
