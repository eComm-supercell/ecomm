/*
  Warnings:

  - Made the column `defaultVariant` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `isSale` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `quantity` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `isWholeSale` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `trackQuantity` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `allowOutOfStockPurchases` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `isFeatured` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `isBestSeller` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `isTopRated` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `isSpecialOffer` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `isAvliable` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "defaultVariant" SET NOT NULL,
ALTER COLUMN "isSale" SET NOT NULL,
ALTER COLUMN "quantity" SET NOT NULL,
ALTER COLUMN "quantity" SET DEFAULT 0,
ALTER COLUMN "isWholeSale" SET NOT NULL,
ALTER COLUMN "trackQuantity" SET NOT NULL,
ALTER COLUMN "allowOutOfStockPurchases" SET NOT NULL,
ALTER COLUMN "isFeatured" SET NOT NULL,
ALTER COLUMN "isBestSeller" SET NOT NULL,
ALTER COLUMN "isTopRated" SET NOT NULL,
ALTER COLUMN "isSpecialOffer" SET NOT NULL,
ALTER COLUMN "isAvliable" SET NOT NULL;
