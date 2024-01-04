import React, { useState, useEffect, useRef } from "react";
import Navbar from "../../components/Navbar";
import { BlobServiceClient } from "@azure/storage-blob";
import axios from "axios";
import { Buffer } from 'buffer';

const Messenger = () => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [editingMessage, setEditingMessage] = useState(null);
  const userId = 1;
  const messagesEndRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

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
    if (!selectedChat || (!newMessage && !selectedFile)) {
      console.error("Invalid message or attachment");
      return;
    }

    const formData = new FormData();
    formData.append("attachment", selectedFile);
    formData.append("attachmentName", selectedFile.name);
    formData.append("text", newMessage);
    
    axios
      .post(
        `http://localhost:5000/api/chats/${selectedChat.id}/messages`,
        formData,
        {
          headers: { "Content-type": "multipart/form-data" },
        }
      )
      .then((response) => {
        const data = response.data;
        setMessages([...messages, data]);
        setNewMessage("");
        setSelectedFile(null);
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

  const handleAttachmentUpload = async () => {
    const fileInput = fileInputRef.current;

    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
      console.error("No file selected");
      return;
    }

    const file = fileInput.files[0];
    setSelectedFile(file);

    // Validate file type and size
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/png",
      "image/jpg",
      "image/jpeg",
    ];
    const maxSize = 1024 * 1024; 

    if (!allowedTypes.includes(file.type) || file.size > maxSize) {
      alert(
        "Invalid file! Please choose a valid file (PDF, DOC, DOCX, PNG, JPG, JPEG) with a size not exceeding 2MB."
      );
      setSelectedFile(null);
      return;
    }

    try {
      const chatId = selectedChat.id;
      const category = file.type.startsWith("image") ? "images" : "documents";
      const blobName = `${chatId}/${category}/${Date.now()}-${file.name}`;

      const storageAccount = process.env.REACT_APP_STORAGE_NAME;
      const sasToken = process.env.REACT_APP_SAS;

      const blobService = new BlobServiceClient(
        `https://${storageAccount}.blob.core.windows.net/${sasToken}`
      );

      const containerClient = blobService.getContainerClient("attachments");
      const blobClient = containerClient.getBlockBlobClient(blobName);

      const options = {
        blobHTTPHeaders: {
          blobContentType: file.type,
        },
      };

      await blobClient.uploadBrowserData(file, options);
    } catch (error) {
      console.error("Error handling attachment:", error);
      alert("Failed to handle attachment.");
    }
  };


  const downloadAttachment = (attachmentData, attachmentName) => {
    try {
      const base64Data = Buffer.from(attachmentData).toString('base64');
      const binaryData = Uint8Array.from(atob(base64Data), (char) => char.charCodeAt(0));
  
      const fileExtension = attachmentName.split('.').pop().toLowerCase();
      
      let contentType;
  
      switch (fileExtension) {
        case 'pdf':
          contentType = 'application/pdf';
          break;
        case 'doc':
        case 'docx':
          contentType = 'application/msword';
          break;
        case 'jpg':
        case 'jpeg':
          contentType = 'image/jpeg';
          break;
        case 'png':
          contentType = 'image/png';
          break;
        default:
          contentType = 'application/octet-stream';
      }
  
      const blob = new Blob([binaryData], { type: contentType });

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = url;
      a.download = attachmentName;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading attachment:", error);
    }
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
                <h1>
                  {selectedChat.user2 === userId
                    ? selectedChat.user1
                    : selectedChat.user2}
                </h1>
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
                      {/* Display text message */}
                      {message.text && <span>{message.text}</span>}
                      {/* Display attachment link */}
                      {message.attachment && (
                         <span>
                         | Attachment: 
                         <button
                           onClick={() =>
                             downloadAttachment(message.attachment, message.attachmentName)
                           }
                         >
                           {message.attachmentName}
                         </button>
                       </span>
                      )}
                      {message.sender === userId && (
                        <div className="flex space-x-2 mt-1">
                          <button onClick={() => handleEditMessage(message)}>
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteMessage(message.id)}
                          >
                            Delete
                          </button>
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
                  <div className="relative w-28 h-8 border border-black rounded-md bg-gray-200">
                    <button
                      className="flex justify-center items-center h-full w-full"
                      onClick={() => fileInputRef.current.click()}
                    >
                      Attachment
                    </button>
                    {selectedFile && (
                      <button
                        className="absolute top-0 right-0 p-1 text-red-600 hover:text-red-800"
                        onClick={() => setSelectedFile(null)}
                      >
                        x
                      </button>
                    )}
                  </div>
                  <input
                    type="file"
                    accept=".pdf, .doc, .docx, .png, .jpg, .jpeg"
                    onChange={handleAttachmentUpload}
                    className="hidden"
                    ref={fileInputRef}
                  />
                  <button
                    className="flex justify-center text-center w-16 h-8 border border-black rounded-md bg-gray-200"
                    onClick={
                      editingMessage ? handleSaveEdit : handleSendMessage
                    }
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
