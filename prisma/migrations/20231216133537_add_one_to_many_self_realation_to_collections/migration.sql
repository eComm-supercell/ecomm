/*
  Warnings:

  - You are about to drop the column `depth` on the `collection` table. All the data in the column will be lost.
  - You are about to drop the column `isRoot` on the `collection` table. All the data in the column will be lost.
  - You are about to drop the column `numchild` on the `collection` table. All the data in the column will be lost.
  - You are about to drop the column `parentId` on the `collection` table. All the data in the column will be lost.
  - You are about to drop the column `path` on the `collection` table. All the data in the column will be lost.
  - You are about to drop the column `position` on the `collection` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "collection_path_idx";

-- DropIndex
DROP INDEX "collection_path_key";

-- AlterTable
ALTER TABLE "collection" DROP COLUMN "depth",
DROP COLUMN "isRoot",
DROP COLUMN "numchild",
DROP COLUMN "parentId",
DROP COLUMN "path",
DROP COLUMN "position",
ADD COLUMN     "parentCollectionId" INTEGER;

-- AddForeignKey
ALTER TABLE "collection" ADD CONSTRAINT "collection_parentCollectionId_fkey" FOREIGN KEY ("parentCollectionId") REFERENCES "collection"("id") ON DELETE SET NULL ON UPDATE CASCADE;
