/*
  Warnings:

  - You are about to drop the column `userId` on the `authentication_method` table. All the data in the column will be lost.
  - You are about to drop the `administrator` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `customer` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[phoneNumber]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[emailAddress]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[authentication_methodId]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "administrator" DROP CONSTRAINT "administrator_userId_fkey";

-- DropForeignKey
ALTER TABLE "authentication_method" DROP CONSTRAINT "authentication_method_userId_fkey";

-- DropForeignKey
ALTER TABLE "customer" DROP CONSTRAINT "customer_userId_fkey";

-- DropIndex
DROP INDEX "authentication_method_type_idx";

-- DropIndex
DROP INDEX "authentication_method_userId_idx";

-- AlterTable
ALTER TABLE "authentication_method" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "authentication_methodId" INTEGER,
ADD COLUMN     "emailAddress" VARCHAR,
ADD COLUMN     "phoneNumber" VARCHAR;

-- DropTable
DROP TABLE "administrator";

-- DropTable
DROP TABLE "customer";

-- CreateTable
CREATE TABLE "profile" (
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(6),
    "firstName" VARCHAR NOT NULL,
    "lastName" VARCHAR NOT NULL,
    "gender" TEXT,
    "id" SERIAL NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profile_userId_key" ON "profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "user_phoneNumber_key" ON "user"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "user_emailAddress_key" ON "user"("emailAddress");

-- CreateIndex
CREATE UNIQUE INDEX "user_authentication_methodId_key" ON "user"("authentication_methodId");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_authentication_methodId_fkey" FOREIGN KEY ("authentication_methodId") REFERENCES "authentication_method"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
