/*
  Warnings:

  - Added the required column `sku` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "barCode" TEXT,
ADD COLUMN     "sku" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ProductVariant" ALTER COLUMN "sku" SET DATA TYPE TEXT;
