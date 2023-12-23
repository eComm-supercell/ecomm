/*
  Warnings:

  - You are about to drop the column `featuredAssetId` on the `product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_featuredAssetId_fkey";

-- AlterTable
ALTER TABLE "product" DROP COLUMN "featuredAssetId",
ADD COLUMN     "assetId" INTEGER;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "asset"("id") ON DELETE SET NULL ON UPDATE CASCADE;
