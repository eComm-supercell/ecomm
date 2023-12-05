/*
  Warnings:

  - You are about to drop the column `pendingOrderLmt` on the `Shop` table. All the data in the column will be lost.
  - You are about to drop the column `addressId` on the `ShopDetails` table. All the data in the column will be lost.
  - Added the required column `cityId` to the `ShopDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provinceId` to the `ShopDetails` table without a default value. This is not possible if the table is not empty.
  - Made the column `displayName` on table `ShopDetails` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `ShopDetails` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone` on table `ShopDetails` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `ShopDetails` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `ShopDetails` required. This step will fail if there are existing NULL values in that column.
  - Made the column `logo` on table `ShopDetails` required. This step will fail if there are existing NULL values in that column.
  - Made the column `latitute` on table `ShopDetails` required. This step will fail if there are existing NULL values in that column.
  - Made the column `longitute` on table `ShopDetails` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "ShopDetails" DROP CONSTRAINT "ShopDetails_addressId_fkey";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "shopId" INTEGER;

-- AlterTable
ALTER TABLE "Shop" DROP COLUMN "pendingOrderLmt";

-- AlterTable
ALTER TABLE "ShopDetails" DROP COLUMN "addressId",
ADD COLUMN     "cityId" INTEGER NOT NULL,
ADD COLUMN     "provinceId" INTEGER NOT NULL,
ALTER COLUMN "displayName" SET NOT NULL,
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "phone" SET NOT NULL,
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "logo" SET NOT NULL,
ALTER COLUMN "latitute" SET NOT NULL,
ALTER COLUMN "longitute" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "ShopDetails" ADD CONSTRAINT "ShopDetails_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShopDetails" ADD CONSTRAINT "ShopDetails_provinceId_fkey" FOREIGN KEY ("provinceId") REFERENCES "Province"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("id") ON DELETE SET NULL ON UPDATE CASCADE;
