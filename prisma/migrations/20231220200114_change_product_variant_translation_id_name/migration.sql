/*
  Warnings:

  - You are about to drop the column `baseId` on the `product_variant_translation` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "product_variant_translation" DROP CONSTRAINT "product_variant_translation_baseId_fkey";

-- DropIndex
DROP INDEX "product_variant_translation_baseid";

-- AlterTable
ALTER TABLE "product_variant_translation" DROP COLUMN "baseId",
ADD COLUMN     "productVariantId" INTEGER;

-- CreateIndex
CREATE INDEX "product_variant_translation_baseid" ON "product_variant_translation"("productVariantId");

-- AddForeignKey
ALTER TABLE "product_variant_translation" ADD CONSTRAINT "product_variant_translation_productVariantId_fkey" FOREIGN KEY ("productVariantId") REFERENCES "product_variant"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
