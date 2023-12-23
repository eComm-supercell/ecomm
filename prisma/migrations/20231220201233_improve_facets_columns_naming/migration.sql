/*
  Warnings:

  - You are about to drop the column `baseId` on the `facet_translation` table. All the data in the column will be lost.
  - You are about to drop the column `baseId` on the `facet_value_translation` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "facet_translation" DROP CONSTRAINT "facet_translation_baseId_fkey";

-- DropForeignKey
ALTER TABLE "facet_value_translation" DROP CONSTRAINT "facet_value_translation_baseId_fkey";

-- DropIndex
DROP INDEX "facet_translation_baseid";

-- DropIndex
DROP INDEX "facet_value_translation_baseid";

-- AlterTable
ALTER TABLE "facet_translation" DROP COLUMN "baseId",
ADD COLUMN     "facetId" INTEGER;

-- AlterTable
ALTER TABLE "facet_value_translation" DROP COLUMN "baseId",
ADD COLUMN     "facetValueId" INTEGER;

-- CreateIndex
CREATE INDEX "facet_translation_baseid" ON "facet_translation"("facetId");

-- CreateIndex
CREATE INDEX "facet_value_translation_baseid" ON "facet_value_translation"("facetValueId");

-- AddForeignKey
ALTER TABLE "facet_translation" ADD CONSTRAINT "facet_translation_facetId_fkey" FOREIGN KEY ("facetId") REFERENCES "facet"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "facet_value_translation" ADD CONSTRAINT "facet_value_translation_facetValueId_fkey" FOREIGN KEY ("facetValueId") REFERENCES "facet_value"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
