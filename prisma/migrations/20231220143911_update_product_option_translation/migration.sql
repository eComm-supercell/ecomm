/*
  Warnings:

  - You are about to drop the column `baseId` on the `product_option_translation` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "product_option_translation" DROP CONSTRAINT "product_option_translation_baseId_fkey";

-- DropIndex
DROP INDEX "product_option_translation_baseid";

-- AlterTable
ALTER TABLE "product_option_translation" DROP COLUMN "baseId",
ADD COLUMN     "productOptionId" INTEGER;

-- AddForeignKey
ALTER TABLE "product_option_translation" ADD CONSTRAINT "product_option_translation_productOptionId_fkey" FOREIGN KEY ("productOptionId") REFERENCES "product_option"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
