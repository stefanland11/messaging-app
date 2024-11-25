const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function acceptFriendQuery(user1, user2) {
  try {
    await prisma.friend.createMany({
      data: [
        { friendId: user1, friendOfId: user2 },
        { friendId: user2, friendOfId: user1 },
      ],
    });
  } catch (error) {
    console.error("Error accepting friend request:", error);
    throw error;
  }
}

/*
const removeFriendship = async (userIdA: string, userIdB: string) => {
  await prisma.user.update({
    where: {id: userIdA},
    data: {friends: {disconnect: [{id: userIdB}]}},
  });
  await prisma.user.update({
    where: {id: userIdB},
    data: {friends: {disconnect: [{id: userIdA}]}},
  });
}
*/
module.exports = {
  acceptFriendQuery,
};
