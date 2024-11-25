const { Router } = require("express");
const apiRouter = Router();
const convoController = require("../controllers/convoController");
const friendController = require("../controllers/friendController");
const notificationController = require("../controllers/notificationController");
const messageController = require("../controllers/messageController");

const jwtAuth = require("../config/jwtAuth");

//convo crud
apiRouter.post("/api/conversation", jwtAuth, convoController.createConvo);
apiRouter.get("/api/conversation/:conversationId", jwtAuth, convoController.getConvo);
apiRouter.get("/api/getAllConversations", jwtAuth, convoController.getAllConvos);
apiRouter.delete("/api/conversation/:conversationId", jwtAuth, convoController.deleteConvo);

//friend request accept
apiRouter.post("/api/acceptFriendRequest", jwtAuth, friendController.acceptFriend);

//message crud
apiRouter.post("/api/message", jwtAuth, messageController.createMessage);
apiRouter.put("/api/message/:messageId", jwtAuth, messageController.editMessage);
apiRouter.delete("/api/message/:messageId", jwtAuth, messageController.deleteMessage);

//notification crud
apiRouter.post("/api/notification", jwtAuth, notificationController.createNotification);
apiRouter.get("/api/notification/:notificationId", jwtAuth, notificationController.getNotifications);
apiRouter.put("/api/notification", jwtAuth,  notificationController.updateNotifications);
apiRouter.delete("/api/notification/:notificationId", jwtAuth, notificationController.deleteNotification);


module.exports = apiRouter;