const db = require("../db/messageQueries");

const createMessage = async (req, res) => {
  try {
    const { conversationId, recipientId, content } = req.body;
    const userId = req.user.id;
    const message = await db.createMessageQuery(
      conversationId,
      userId,
      recipientId,
      content
    );
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: "Error seding message" });
  }
};

const editMessage = async (req, res) => {
  try {
    const { messageId, content } = req.body;
    const message = await db.editMessageQuery(messageId, content);
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: "Error editing message" });
  }
};

const deleteMessage = async (req, res) => {
  try {
    const { messageId } = req.body;
    const message = await db.deleteMessageQuery(messageId);
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: "Error deleting message" });
  }
};

module.exports = {
  createMessage,
  editMessage,
  deleteMessage,
};
