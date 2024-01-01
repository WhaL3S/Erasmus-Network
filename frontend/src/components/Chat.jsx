import React from 'react';

const Chat = ({ messages, newMessage, setNewMessage, sendMessage }) => {
  return (
    <div>
      <div>
        {messages.map((message) => (
          <div key={message._id}>
            <p>{message.content}</p>
            {message.attachmentUrl && <img src={message.attachmentUrl} alt="Attachment" />}
          </div>
        ))}
      </div>
      <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
