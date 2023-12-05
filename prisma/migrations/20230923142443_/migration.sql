/*
  Warnings:

  - The `shopType` column on the `Shop` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `daysOff` column on the `Shop` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Made the column `openTime` on table `Shop` required. This step will fail if there are existing NULL values in that column.
  - Made the column `closeTime` on table `Shop` required. This step will fail if there are existing NULL values in that column.
  - Made the column `pendingOrderLmt` on table `Shop` required. This step will fail if there are existing NULL values in that column.
  - Made the column `canPreOrder` on table `Shop` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "ShopType" AS ENUM ('retaile', 'wholesale', 'restaurant', 'small_business');

-- CreateEnum
CREATE TYPE "DaysOff" AS ENUM ('sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday');

-- AlterTable
ALTER TABLE "Shop" DROP COLUMN "shopType",
ADD COLUMN     "shopType" "ShopType" NOT NULL DEFAULT 'retaile',
ALTER COLUMN "openTime" SET NOT NULL,
ALTER COLUMN "closeTime" SET NOT NULL,
DROP COLUMN "daysOff",
ADD COLUMN     "daysOff" "DaysOff"[] DEFAULT ARRAY[]::"DaysOff"[],
ALTER COLUMN "pendingOrderLmt" SET NOT NULL,
ALTER COLUMN "canPreOrder" SET NOT NULL;
