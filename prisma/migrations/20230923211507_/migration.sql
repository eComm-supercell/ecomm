/*
  Warnings:

  - You are about to drop the `wholesalePrice` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "wholesalePrice" DROP CONSTRAINT "wholesalePrice_productId_fkey";

-- DropTable
DROP TABLE "wholesalePrice";
