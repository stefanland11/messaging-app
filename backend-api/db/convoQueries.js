const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createConvoQuery(memberIds) {
  try {
    const conversation = await prisma.conversation.create({
      data: {
        members: {
          connect: memberIds.map((id) => ({ id })),
        },
      },
    });

    console.log("Conversation created successfully");
    return conversation;
  } catch (error) {
    console.error("Error creating conversation:", error);
    throw error;
  }
}

async function getAllConvosQuery(userId) {
  try {
    const conversations = await prisma.conversation.findMany({
      where: {
        members: {
          some: { id: userId },
        },
      },
      include: {
        members: true,
        messages: {
          orderBy: { sentAt: 'asc' }, 
        },
      },
    });

    return conversations;
  } catch (error) {
    console.error("Error retrieving conversations for user:", error);
    throw error;
  }
}

async function getConvoQuery(conversationId) {
  try {
    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
      include: {
        members: true,
        messages: true,
      },
    });

    return conversation;
  } catch (error) {
    console.error("Error retrieving conversation:", error);
    throw error;
  }
}

async function deleteConvoQuery(conversationId) {
  try {
    await prisma.conversation.delete({
      where: { id: conversationId },
    });

    console.log("Conversation deleted successfully");
  } catch (error) {
    console.error("Error deleting conversation:", error);
    throw error;
  }
}


module.exports = {
    createConvoQuery,
    getAllConvosQuery,
    getConvoQuery,
    deleteConvoQuery,
};
  