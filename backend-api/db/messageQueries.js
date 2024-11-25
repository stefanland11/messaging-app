const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createMessageQuery(conversationId, senderId, recipientId, content) {
  try {
    const message = await prisma.message.create({
      data: {
        content,
        sender: { connect: { id: senderId } },
        recipient: { connect: { id: recipientId } },
        conversation: { connect: { id: conversationId } },
      },
    });

    console.log("Message created successfully");
    return message;
  } catch (error) {
    console.error("Error creating message:", error);
    throw error;
  }
}

async function editMessageQuery(messageId, newContent) {
  try {
    const updatedMessage = await prisma.message.update({
      where: { id: messageId },
      data: { content: newContent },
    });

    console.log("Message updated successfully");
    return updatedMessage;
  } catch (error) {
    console.error("Error editing message:", error);
    throw error;
  }
}

async function deleteMessageQuery(messageId) {
  try {
    await prisma.message.delete({
      where: { id: messageId },
    });

    console.log("Message deleted successfully");
  } catch (error) {
    console.error("Error deleting message:", error);
    throw error;
  }
}

module.exports = {
  createMessageQuery,
  editMessageQuery,
  deleteMessageQuery,
};
