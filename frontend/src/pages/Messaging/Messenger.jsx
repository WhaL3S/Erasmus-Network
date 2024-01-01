import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

const Messenger = () => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [editingMessage, setEditingMessage] = useState(null);
  const userId = 1;
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/users/${userId}/chats`)
      .then((response) => response.json())
      .then((data) => setChats(data))
      .catch((error) => console.error("Error fetching chats:", error));
  }, []);

  useEffect(() => {
    if (selectedChat) {
      fetch(`http://localhost:5000/api/chats/${selectedChat.id}/messages`)
        .then((response) => response.json())
        .then((data) => setMessages(data))
        .catch((error) => console.error("Error fetching messages:", error));
    }
  }, [selectedChat, editingMessage]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleChatClick = (chat) => {
    setSelectedChat(chat);
  };

  const handleSendMessage = () => {
    fetch(`http://localhost:5000/api/chats/${selectedChat.id}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: newMessage }),
    })
      .then((response) => response.json())
      .then((data) => {
        setMessages([...messages, data]);
        setNewMessage("");
      })
      .catch((error) => console.error("Error sending message:", error));
  };

  const handleEditMessage = (message) => {
    setEditingMessage(message);
    setNewMessage(message.text);
  };

  const handleSaveEdit = () => {
    if (editingMessage) {
      fetch(`http://localhost:5000/api/messages/${editingMessage.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: newMessage }),
      })
        .then((response) => response.json())
        .then((data) => {
          const updatedMessages = messages.map((msg) =>
            msg.id === editingMessage.id ? data : msg
          );
          setMessages(updatedMessages);
          setEditingMessage(null);
          setNewMessage("");
        })
        .catch((error) => console.error("Error editing message:", error));
    }
  };

  const handleDeleteMessage = (messageId) => {
    fetch(`http://localhost:5000/api/messages/${messageId}`, {
      method: "DELETE",
    })
      .then(() => {
        const updatedMessages = messages.filter((msg) => msg.id !== messageId);
        setMessages(updatedMessages);
      })
      .catch((error) => console.error("Error deleting message:", error));
  };

  return (
    <div className="bg-gray-200 h-screen">
      <Navbar />
      <div className="m-10 h-3/4 w-11/12 flex flex-row rounded-3xl space-x-10">
        <div className="flex flex-col w-1/4 h-full space-y-6">
          {/* Chats list */}
          <div className="w-full h-1/6 flex justify-center items-center bg-white rounded-3xl border-black border">
            <h1>Chats list</h1>
          </div>
          <div className="w-full h-5/6 flex flex-col items-start bg-white rounded-3xl border-black border">
            {chats.map((chat) => (
              <React.Fragment key={chat.id}>
                <div
                  className={`w-full h-1/4 flex justify-center items-center rounded-3xl cursor-pointer ${
                    selectedChat === chat ? "bg-gray-300" : ""
                  }`}
                  onClick={() => handleChatClick(chat)}
                >
                  <h3>{chat.user1 === userId ? chat.user2 : chat.user1}</h3>
                </div>
                <hr className="border-none h-px bg-black" />
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="flex flex-col w-3/4 h-full space-y-6">
          {selectedChat ? (
            // Display messages for the selected chat
            <>
              <div className="w-full h-1/6 flex justify-center items-center justify-self-center border-black border bg-white rounded-3xl">
                <h1>{selectedChat.user2 === userId ? selectedChat.user1 : selectedChat.user2}</h1>
              </div>

              <div className="w-full h-5/6 flex flex-col space-y-6 overflow-hidden">
                {/* Messages display */}
                <div className="w-full h-5/6 flex flex-col items-start border-black border bg-white rounded-3xl overflow-y-scroll p-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`mb-2 p-2 rounded-md ${
                        message.sender === userId
                          ? "bg-blue-200 text-right"
                          : "bg-gray-200 text-left"
                      }`}
                    >
                      {message.text}
                      {message.sender === userId && (
                        <div className="flex space-x-2 mt-1">
                          <button onClick={() => handleEditMessage(message)}>Edit</button>
                          <button onClick={() => handleDeleteMessage(message.id)}>Delete</button>
                        </div>
                      )}
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message input and send button */}
                <div className="w-full h-1/6 flex items-center justify-center space-x-2 border-black border bg-white rounded-3xl">
                  <input
                    type="text"
                    className="h-8 border border-black w-4/6 rounded-md text-xl p-3 tracking-widest"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <Link
                    className="flex justify-center text-center w-28 h-8 border border-black rounded-md bg-gray-200"
                    to="/messenger/attachment"
                  >
                    Attachment
                  </Link>
                  <button
                    className="flex justify-center text-center w-16 h-8 border border-black rounded-md bg-gray-200"
                    onClick={editingMessage ? handleSaveEdit : handleSendMessage}
                  >
                    {editingMessage ? "Save" : "Send"}
                  </button>
                </div>
              </div>
            </>
          ) : (
            // No chat selected
            <>
              <div className="flex flex-col w-full h-full space-y-6">
                <div className="w-full h-1/6 flex justify-center items-center justify-self-center border-black border bg-white rounded-3xl" />

                <div className="w-full h-5/6 flex flex-col space-y-6">
                  <div className="w-full h-5/6 flex justify-center items-center border-black border bg-white rounded-3xl">
                    <h1>No chat is selected</h1>
                  </div>

                  <div className="w-full h-1/6 flex items-center justify-center space-x-2 border-black border bg-white rounded-3xl">
                    <input
                      type="text"
                      className="h-8 border border-black w-4/6 rounded-md text-xl p-3 tracking-widest"
                    />
                    <button
                      className="flex justify-center text-center w-28 h-8 border border-black rounded-md bg-gray-200"
                      disabled
                    >
                      Attachment
                    </button>
                    <button
                      disabled
                      className=" flex justify-center text-center w-16 h-8 border border-black rounded-md bg-gray-200"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messenger;
