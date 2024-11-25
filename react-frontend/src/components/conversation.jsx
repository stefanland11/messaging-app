import { useState, useEffect, useRef } from "react";
import formatMessageTime from "./formatMessageTime";
import "../style/conversation.css";
import sendIcon from "../assets/send-fill.svg";

const Conversation = ({ selectedConversation, user, getUserData }) => {
  const [error, setError] = useState();
  const [messageContent, setMessageContent] = useState("");
  const token = localStorage.getItem("token");
  const messagesEndRef = useRef(null);

  // Automatically scroll to the bottom of messages div
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "instant" });
    }
  }, [selectedConversation?.messages]); // Safe access with optional chaining

  if (!selectedConversation) {
    return <div>No conversation selected.</div>;
  }

  
  const recipient = user 
  ? selectedConversation.members.find((member) => member.id !== user.id) 
  : null;

  const handleChange = (message) => {
    setMessageContent(message);
  };

  const newMessage = (conversationId, recipientId) => {
    if (!messageContent.trim()) {
      setError("Message content cannot be empty");
      return;
    }
    fetch(`http://localhost:3000/api/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        content: messageContent,
        conversationId,
        recipientId,
      }),
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("server error");
        }
        return response.json();
      })
      .then((response) => {
        console.log(response);
        getUserData(token);
        messageNotification(recipientId);
      })
      .catch((error) => setError(error));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    newMessage(selectedConversation.id, recipient.id);
    setMessageContent("");
  };

  const messageNotification = (recipientId) => {
    fetch(`http://localhost:3000/api/notification`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ recipientId: recipientId, type: "MESSAGE" }),
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("server error");
        }
        return response.json();
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => setError(error));
  };

  return (
    <>
      <h2>{recipient.username}</h2>
      <div className="messages">
        {selectedConversation.messages.map((message, index) => (
          <div
            key={index}
            className={message.senderId === user.id ? "sender" : "recipient"}
          >
            <p>{message.content}</p>
            <p>{formatMessageTime(message.sentAt)}</p>
          </div>
        ))}
        {/* Invisible reference to scroll to */}
        <div ref={messagesEndRef}></div>
      </div>
      <form className="new-message" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="New Message"
          name="messageContent"
          value={messageContent}
          onChange={(e) => handleChange(e.target.value)}
        />
        <button type="submit">
          <img src={sendIcon} alt="Send" />
        </button>
      </form>
    </>
  );
};

export default Conversation;
