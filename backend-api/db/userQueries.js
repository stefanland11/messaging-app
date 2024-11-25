const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createUserQuery(username, password) {
  try {
    await prisma.user.create({
      data: {
        username: username,
        password: password,
      },
    });

    console.log("User created successfully");
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

async function getUserDataQuery(userId) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        conversations: {
          include: {
            members: true,
            messages: {
              orderBy: { sentAt: "asc" },
            },
          },
        },
        friends: {
          include: {
            friendOf: {
              select: {
                username: true,
              },
            },
          },
        },
        notifications: {
          include: {
            sentBy: {
              select: {
                username: true,
              },
            },
          },
        },
      },
    });

    return user;
  } catch (error) {
    console.error("Error retrieving data for user:", error);
    throw error;
  }
}

async function getAllUsersQuery() {
  try {
    const users = await prisma.user.findMany({
      include: {
        password: false,
      },
    });

    return users;
  } catch (err) {
    console.error("Error returning users:", error);
    throw error;
  }
}

module.exports = {
  createUserQuery,
  getUserDataQuery,
  getAllUsersQuery,
};
