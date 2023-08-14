const MessageContainer = ({ messages, curUser }) => {
    return <div className='message-container'>
        {messages.map((m, index) =>
            <div key={index} className={m.user === curUser ? 'user-message' : 'my-message'}>
                <div className={m.user === curUser ? 'message bg-success' : 'message bg-primary'}>{m.message}</div>
                <div className='from=user'>{m.user}</div>
            </div>
        )}
    </div>
}

export default MessageContainer;