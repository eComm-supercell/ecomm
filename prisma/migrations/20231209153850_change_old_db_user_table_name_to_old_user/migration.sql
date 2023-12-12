/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ShopToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Coupon" DROP CONSTRAINT "Coupon_referrerId_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_userId_fkey";

-- DropForeignKey
ALTER TABLE "NotificationToken" DROP CONSTRAINT "NotificationToken_userId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_userId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_deliveryBoyId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_walletId_fkey";

-- DropForeignKey
ALTER TABLE "_ShopToUser" DROP CONSTRAINT "_ShopToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ShopToUser" DROP CONSTRAINT "_ShopToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "cart" DROP CONSTRAINT "cart_userId_fkey";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "_ShopToUser";

-- CreateTable
CREATE TABLE "OldUser" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "emailVerifiedAt" TIMESTAMP(3),
    "email" TEXT,
    "username" TEXT,
    "lname" TEXT,
    "fname" TEXT,
    "password" TEXT,
    "provider" TEXT,
    "providerId" TEXT,
    "rewardPoints" INTEGER DEFAULT 0,
    "role" TEXT DEFAULT 'customer',
    "shopId" INTEGER,
    "deliveryBoyId" INTEGER,
    "walletId" INTEGER NOT NULL,

    CONSTRAINT "OldUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_OldUserToShop" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "OldUser_email_key" ON "OldUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "OldUser_username_key" ON "OldUser"("username");

-- CreateIndex
CREATE UNIQUE INDEX "OldUser_deliveryBoyId_key" ON "OldUser"("deliveryBoyId");

-- CreateIndex
CREATE UNIQUE INDEX "OldUser_walletId_key" ON "OldUser"("walletId");

-- CreateIndex
CREATE UNIQUE INDEX "_OldUserToShop_AB_unique" ON "_OldUserToShop"("A", "B");

-- CreateIndex
CREATE INDEX "_OldUserToShop_B_index" ON "_OldUserToShop"("B");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "OldUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OldUser" ADD CONSTRAINT "OldUser_deliveryBoyId_fkey" FOREIGN KEY ("deliveryBoyId") REFERENCES "DeliveryBoy"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OldUser" ADD CONSTRAINT "OldUser_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "OldUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "OldUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "OldUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "OldUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "OldUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotificationToken" ADD CONSTRAINT "NotificationToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "OldUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Coupon" ADD CONSTRAINT "Coupon_referrerId_fkey" FOREIGN KEY ("referrerId") REFERENCES "OldUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OldUserToShop" ADD CONSTRAINT "_OldUserToShop_A_fkey" FOREIGN KEY ("A") REFERENCES "OldUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OldUserToShop" ADD CONSTRAINT "_OldUserToShop_B_fkey" FOREIGN KEY ("B") REFERENCES "Shop"("id") ON DELETE CASCADE ON UPDATE CASCADE;
