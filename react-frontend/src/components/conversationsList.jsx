import { useEffect } from "react";
import formatMessageTime from "./formatMessageTime";

const ConversationsList = ({ user, handleConversationClick, setSelectedConversation }) => {
  useEffect(() => {
    if (user.conversations && user.conversations.length > 0) {
      const sortedConversations = [...user.conversations].sort((a, b) => {
        const aLastMessage = a.messages[a.messages.length - 1];
        const bLastMessage = b.messages[b.messages.length - 1];
        return (
          new Date(bLastMessage?.sentAt || 0) -
          new Date(aLastMessage?.sentAt || 0)
        );
      });
      setSelectedConversation(sortedConversations[0]);
    }
  }, [user.conversations, setSelectedConversation]);

  if (!user.conversations || !Array.isArray(user.conversations)) {
    return <div>Loading conversations...</div>;
  }
  
  const conversationsDiv = user.conversations.map((conversation) => {
    const mostRecentMessage =
      conversation.messages && conversation.messages.length > 0
        ? conversation.messages[conversation.messages.length - 1]
        : null;
    const recipient = conversation.members.find(
      (member) => member.id !== user.id
    );
    if (!recipient) {
      console.error("Recipient is missing in conversation:", conversation);
      return null;
    }
    return (
      <div
        key={conversation.id}
        onClick={() => handleConversationClick(conversation)}
      >
        <p>{recipient.username}</p>
        {mostRecentMessage && (
          <>
            <p>{formatMessageTime(mostRecentMessage.sentAt)}</p>
            <div>{mostRecentMessage.content}</div>
          </>
        )}
      </div>
    );
  });

  return <div className="conversations-list">{conversationsDiv}</div>;
};
export default ConversationsList;
