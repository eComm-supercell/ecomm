/*
  Warnings:

  - You are about to drop the column `baseId` on the `collection_translation` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "collection_translation" DROP CONSTRAINT "collection_translation_baseId_fkey";

-- DropIndex
DROP INDEX "collection_translation_baseid_idx";

-- DropIndex
DROP INDEX "collection_translation_slug_idx";

-- AlterTable
ALTER TABLE "collection_translation" DROP COLUMN "baseId",
ADD COLUMN     "collectionId" INTEGER;

-- AddForeignKey
ALTER TABLE "collection_translation" ADD CONSTRAINT "collection_translation_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "collection"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
