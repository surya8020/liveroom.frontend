import MessageContainer from './messageContainer'
import { Form, Button } from "react-bootstrap"
import { useState } from 'react'


const Chat = ({ messages, sendMessage, curUser }) => {
    const [newMessage, setNewMessage] = useState();
    const handleSendMessage = () => {
        sendMessage(newMessage);
        setNewMessage(''); // Reset the input after sending
    };

    return (<div>
        <div className='chat'>
            <MessageContainer messages={messages} curUser={curUser} />
            <Form.Control placeholder='enter new message...' value={newMessage} onChange={e => setNewMessage(e.target.value)} />
            <Button onClick={handleSendMessage}>Send</Button>
        </div>
    </div>)
}


export default Chat;