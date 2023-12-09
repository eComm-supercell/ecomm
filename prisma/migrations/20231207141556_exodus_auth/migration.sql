/*
  Warnings:

  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ApiKey` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AuditLog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `City` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Coupon` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DeliveryBoy` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `InventoryLog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MobileAppConfig` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Notification` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `NotificationToken` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OrderItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PaymentDetails` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductImage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductVariant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductVariantImage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Province` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Shop` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ShopDetails` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SubOrderItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SystemConfig` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Ucode` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Wallet` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WalletTransaction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CategoryToProduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProductToTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ShopToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cart` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_cityId_fkey";

-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_profileId_fkey";

-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_provinceId_fkey";

-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_authorId_fkey";

-- DropForeignKey
ALTER TABLE "City" DROP CONSTRAINT "City_provinceId_fkey";

-- DropForeignKey
ALTER TABLE "Coupon" DROP CONSTRAINT "Coupon_referrerId_fkey";

-- DropForeignKey
ALTER TABLE "InventoryLog" DROP CONSTRAINT "InventoryLog_productId_fkey";

-- DropForeignKey
ALTER TABLE "InventoryLog" DROP CONSTRAINT "InventoryLog_productvariantId_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_userId_fkey";

-- DropForeignKey
ALTER TABLE "NotificationToken" DROP CONSTRAINT "NotificationToken_userId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_addressId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_paymentDetailsId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_shopId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_userId_fkey";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_orderId_fkey";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_productId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_shopId_fkey";

-- DropForeignKey
ALTER TABLE "ProductImage" DROP CONSTRAINT "ProductImage_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductVariant" DROP CONSTRAINT "ProductVariant_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductVariantImage" DROP CONSTRAINT "ProductVariantImage_productVariantId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- DropForeignKey
ALTER TABLE "Shop" DROP CONSTRAINT "Shop_shopDetailsId_fkey";

-- DropForeignKey
ALTER TABLE "ShopDetails" DROP CONSTRAINT "ShopDetails_cityId_fkey";

-- DropForeignKey
ALTER TABLE "ShopDetails" DROP CONSTRAINT "ShopDetails_provinceId_fkey";

-- DropForeignKey
ALTER TABLE "SubOrderItem" DROP CONSTRAINT "SubOrderItem_productId_fkey";

-- DropForeignKey
ALTER TABLE "SystemConfig" DROP CONSTRAINT "SystemConfig_mobileAppConfigId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_deliveryBoyId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_walletId_fkey";

-- DropForeignKey
ALTER TABLE "WalletTransaction" DROP CONSTRAINT "WalletTransaction_walletId_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToProduct" DROP CONSTRAINT "_CategoryToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToProduct" DROP CONSTRAINT "_CategoryToProduct_B_fkey";

-- DropForeignKey
ALTER TABLE "_ProductToTag" DROP CONSTRAINT "_ProductToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductToTag" DROP CONSTRAINT "_ProductToTag_B_fkey";

-- DropForeignKey
ALTER TABLE "_ShopToUser" DROP CONSTRAINT "_ShopToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ShopToUser" DROP CONSTRAINT "_ShopToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "cart" DROP CONSTRAINT "cart_productId_fkey";

-- DropForeignKey
ALTER TABLE "cart" DROP CONSTRAINT "cart_userId_fkey";

-- DropTable
DROP TABLE "Address";

-- DropTable
DROP TABLE "ApiKey";

-- DropTable
DROP TABLE "AuditLog";

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "City";

-- DropTable
DROP TABLE "Coupon";

-- DropTable
DROP TABLE "DeliveryBoy";

-- DropTable
DROP TABLE "InventoryLog";

-- DropTable
DROP TABLE "MobileAppConfig";

-- DropTable
DROP TABLE "Notification";

-- DropTable
DROP TABLE "NotificationToken";

-- DropTable
DROP TABLE "Order";

-- DropTable
DROP TABLE "OrderItem";

-- DropTable
DROP TABLE "PaymentDetails";

-- DropTable
DROP TABLE "Product";

-- DropTable
DROP TABLE "ProductImage";

-- DropTable
DROP TABLE "ProductVariant";

-- DropTable
DROP TABLE "ProductVariantImage";

-- DropTable
DROP TABLE "Profile";

-- DropTable
DROP TABLE "Province";

-- DropTable
DROP TABLE "Shop";

-- DropTable
DROP TABLE "ShopDetails";

-- DropTable
DROP TABLE "SubOrderItem";

-- DropTable
DROP TABLE "SystemConfig";

-- DropTable
DROP TABLE "Tag";

-- DropTable
DROP TABLE "Ucode";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "Wallet";

-- DropTable
DROP TABLE "WalletTransaction";

-- DropTable
DROP TABLE "_CategoryToProduct";

-- DropTable
DROP TABLE "_ProductToTag";

-- DropTable
DROP TABLE "_ShopToUser";

-- DropTable
DROP TABLE "cart";

-- DropEnum
DROP TYPE "DaysOff";

-- DropEnum
DROP TYPE "ShopStatus";

-- DropEnum
DROP TYPE "ShopType";

-- CreateTable
CREATE TABLE "administrator" (
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(6),
    "firstName" VARCHAR NOT NULL,
    "lastName" VARCHAR NOT NULL,
    "emailAddress" VARCHAR NOT NULL,
    "id" SERIAL NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "administrator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "authentication_method" (
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "identifier" VARCHAR,
    "passwordHash" VARCHAR,
    "verificationToken" VARCHAR,
    "passwordResetToken" VARCHAR,
    "identifierChangeToken" VARCHAR,
    "pendingIdentifier" VARCHAR,
    "strategy" VARCHAR,
    "externalIdentifier" VARCHAR,
    "metadata" TEXT,
    "id" SERIAL NOT NULL,
    "type" VARCHAR NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "authentication_method_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customer" (
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(6),
    "title" VARCHAR,
    "firstName" VARCHAR NOT NULL,
    "lastName" VARCHAR NOT NULL,
    "phoneNumber" VARCHAR,
    "emailAddress" VARCHAR NOT NULL,
    "id" SERIAL NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role" (
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "code" VARCHAR NOT NULL,
    "description" VARCHAR NOT NULL,
    "permissions" TEXT NOT NULL,
    "id" SERIAL NOT NULL,

    CONSTRAINT "role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "token" VARCHAR NOT NULL,
    "expires" TIMESTAMP(6) NOT NULL,
    "invalidated" BOOLEAN NOT NULL,
    "authenticationStrategy" VARCHAR,
    "id" SERIAL NOT NULL,
    "type" VARCHAR NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(6),
    "identifier" VARCHAR NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "lastLogin" TIMESTAMP(6),
    "id" SERIAL NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_roles_role" (
    "userId" INTEGER NOT NULL,
    "roleId" INTEGER NOT NULL,

    CONSTRAINT "user_roles_role_pkey" PRIMARY KEY ("userId","roleId")
);

-- CreateIndex
CREATE UNIQUE INDEX "administrator_emailAddress_key" ON "administrator"("emailAddress");

-- CreateIndex
CREATE UNIQUE INDEX "administrator_userId_key" ON "administrator"("userId");

-- CreateIndex
CREATE INDEX "authentication_method_userId_idx" ON "authentication_method"("userId");

-- CreateIndex
CREATE INDEX "authentication_method_type_idx" ON "authentication_method"("type");

-- CreateIndex
CREATE UNIQUE INDEX "customer_userId_key" ON "customer"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "session_token_key" ON "session"("token");

-- CreateIndex
CREATE INDEX "session_userId_idx" ON "session"("userId");

-- CreateIndex
CREATE INDEX "session_type_idx" ON "session"("type");

-- CreateIndex
CREATE INDEX "user_roles_role_roleId_idx" ON "user_roles_role"("roleId");

-- CreateIndex
CREATE INDEX "user_roles_role_userId_idx" ON "user_roles_role"("userId");

-- AddForeignKey
ALTER TABLE "administrator" ADD CONSTRAINT "administrator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "authentication_method" ADD CONSTRAINT "authentication_method_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "customer" ADD CONSTRAINT "customer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_roles_role" ADD CONSTRAINT "user_roles_role_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_roles_role" ADD CONSTRAINT "user_roles_role_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
