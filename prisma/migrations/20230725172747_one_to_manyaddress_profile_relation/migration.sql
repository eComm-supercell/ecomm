/*
  Warnings:

  - You are about to drop the `_AddressToProfile` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[profileId]` on the table `Address` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `profileId` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_AddressToProfile" DROP CONSTRAINT "_AddressToProfile_A_fkey";

-- DropForeignKey
ALTER TABLE "_AddressToProfile" DROP CONSTRAINT "_AddressToProfile_B_fkey";

-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "profileId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_AddressToProfile";

-- CreateIndex
CREATE UNIQUE INDEX "Address_profileId_key" ON "Address"("profileId");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
