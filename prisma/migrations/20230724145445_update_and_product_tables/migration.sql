/*
  Warnings:

  - You are about to drop the column `optionSetId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `shopUrlId` on the `ShopDetails` table. All the data in the column will be lost.
  - You are about to drop the `Data` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OptionSet` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OptionSetElement` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ShopUrl` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SubOrder` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[shopDetailsId]` on the table `Shop` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[shopId]` on the table `ShopDetails` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `Tag` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Tag` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `shopDetailsId` to the `Shop` table without a default value. This is not possible if the table is not empty.
  - Made the column `shopId` on table `ShopDetails` required. This step will fail if there are existing NULL values in that column.
  - Made the column `addressId` on table `ShopDetails` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `slug` to the `Tag` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OptionSet" DROP CONSTRAINT "OptionSet_shopId_fkey";

-- DropForeignKey
ALTER TABLE "OptionSetElement" DROP CONSTRAINT "OptionSetElement_optionSetId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_optionSetId_fkey";

-- DropForeignKey
ALTER TABLE "ProductTag" DROP CONSTRAINT "ProductTag_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductTag" DROP CONSTRAINT "ProductTag_tagId_fkey";

-- DropForeignKey
ALTER TABLE "ShopDetails" DROP CONSTRAINT "ShopDetails_shopId_fkey";

-- DropForeignKey
ALTER TABLE "ShopDetails" DROP CONSTRAINT "ShopDetails_shopUrlId_fkey";

-- DropForeignKey
ALTER TABLE "SubOrder" DROP CONSTRAINT "SubOrder_orderId_fkey";

-- DropForeignKey
ALTER TABLE "SubOrder" DROP CONSTRAINT "SubOrder_sellerId_fkey";

-- DropForeignKey
ALTER TABLE "SubOrder" DROP CONSTRAINT "SubOrder_shopId_fkey";

-- DropForeignKey
ALTER TABLE "SubOrderItem" DROP CONSTRAINT "SubOrderItem_subOrderId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "optionSetId";

-- AlterTable
ALTER TABLE "Shop" ADD COLUMN     "shopDetailsId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ShopDetails" DROP COLUMN "shopUrlId",
ALTER COLUMN "shopId" SET NOT NULL,
ALTER COLUMN "addressId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "slug" TEXT NOT NULL;

-- DropTable
DROP TABLE "Data";

-- DropTable
DROP TABLE "OptionSet";

-- DropTable
DROP TABLE "OptionSetElement";

-- DropTable
DROP TABLE "ProductTag";

-- DropTable
DROP TABLE "ShopUrl";

-- DropTable
DROP TABLE "SubOrder";

-- CreateTable
CREATE TABLE "_ProductToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToTag_AB_unique" ON "_ProductToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToTag_B_index" ON "_ProductToTag"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Shop_shopDetailsId_key" ON "Shop"("shopDetailsId");

-- CreateIndex
CREATE UNIQUE INDEX "ShopDetails_shopId_key" ON "ShopDetails"("shopId");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_title_key" ON "Tag"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_slug_key" ON "Tag"("slug");

-- AddForeignKey
ALTER TABLE "Shop" ADD CONSTRAINT "Shop_shopDetailsId_fkey" FOREIGN KEY ("shopDetailsId") REFERENCES "ShopDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToTag" ADD CONSTRAINT "_ProductToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToTag" ADD CONSTRAINT "_ProductToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
