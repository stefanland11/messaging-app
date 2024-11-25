const db = require("../db/convoQueries");

const createConvo = async (req, res) => {
  try {
    const { friendId } = req.body;
    const userId = req.user.id;
    console.log(friendId);

    const convo = await db.createConvoQuery([friendId, userId]);
    res.status(201).json(convo);
  } catch (error) {
    res.status(500).json({ message: "Error creating conversation" });
  }
};

const getAllConvos = async (req, res) => {
  try {
    const convos = await db.getAllConvosQuery(req.user.id);
    res.json({ convos });
  } catch (error) {
    console.error("Error fetching conversations:", error);
    res.status(500).json({ message: "Error fetching conversations." });
  }
};

const getConvo = async (req, res) => {
  const { conversationId } = req.params;

  try {
    const convo = await db.getConvoQuery(parseInt(conversationIdId));
    console.log(convo);
    res.json({ convo });
  } catch (error) {
    console.error("Error fetching conversation", error);
    res.status(500).json({ message: "Error fetching conversation" });
  }
};

const deleteConvo = async (req, res) => {
  const { conversationId } = req.params;
  const userId = req.user.id;
  try {
    await db.deleteConvoQuery(parseInt(userId), parseInt(conversationId));
    res.json({ message: "Delete successful" });
  } catch (error) {
    console.error("Error deleting conversation:", error);
    res.status(500).json({ message: "Error deleting conversation" });
  }
};

module.exports = {
  createConvo,
  getAllConvos,
  getConvo,
  deleteConvo,
};
