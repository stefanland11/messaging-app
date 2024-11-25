/*
  Warnings:

  - A unique constraint covering the columns `[userId,sentById,type]` on the table `Notification` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Notification_userId_sentById_type_key" ON "Notification"("userId", "sentById", "type");
