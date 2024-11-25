const formatMessageTime = (sentAt) => {
    const messageDate = new Date(sentAt);
    const now = new Date();
  
    // Check if the message is from today
    if (
      messageDate.getFullYear() === now.getFullYear() &&
      messageDate.getMonth() === now.getMonth() &&
      messageDate.getDate() === now.getDate()
    ) {
      // Display the time
      return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  
    // Check if the message is from yesterday
    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
    if (
      messageDate.getFullYear() === yesterday.getFullYear() &&
      messageDate.getMonth() === yesterday.getMonth() &&
      messageDate.getDate() === yesterday.getDate()
    ) {
      return "Yesterday";
    }
  
    // Check if the message is within the last week
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(now.getDate() - 7);
    if (messageDate > oneWeekAgo) {
      // Display the day of the week
      return messageDate.toLocaleDateString(undefined, { weekday: 'long' });
    }
  
    // Default
    return `${messageDate.getMonth() + 1}/${messageDate.getDate()}/${messageDate.getFullYear()}`;
  };
export default formatMessageTime;