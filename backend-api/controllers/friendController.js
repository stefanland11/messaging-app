const db = require("../db/friendQueries");

const acceptFriend = async (req, res) => {
  try {
    const { userId, sentById } = req.body;
    console.log(userId + " " + sentById);
    console.log(req.body);

    await db.acceptFriendQuery(parseInt(userId), parseInt(sentById));
    res.status(201).json("Friend Request Accepted");
  } catch (error) {
    res.status(500).json({ message: "Error accepting friend request" });
  }
};

module.exports = {
    acceptFriend,
}

