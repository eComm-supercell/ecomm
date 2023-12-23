/*
  Warnings:

  - Changed the type of `currencyCode` on the `product_variant_price` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "CurrencyCode" AS ENUM ('USD', 'IQD');

-- DropIndex
DROP INDEX "product_variant_price_variantid";

-- AlterTable
ALTER TABLE "product_variant_price" DROP COLUMN "currencyCode",
ADD COLUMN     "currencyCode" "CurrencyCode" NOT NULL;
