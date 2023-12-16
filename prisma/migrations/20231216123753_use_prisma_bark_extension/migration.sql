/*
  Warnings:

  - You are about to drop the `collection_closure` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `collection_product_variants_product_variant` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[path]` on the table `collection` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `depth` to the `collection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `path` to the `collection` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "collection" DROP CONSTRAINT "collection_parentId_fkey";

-- DropForeignKey
ALTER TABLE "collection_closure" DROP CONSTRAINT "collection_closure_id_ancestor_fkey";

-- DropForeignKey
ALTER TABLE "collection_closure" DROP CONSTRAINT "collection_closure_id_descendant_fkey";

-- DropForeignKey
ALTER TABLE "collection_product_variants_product_variant" DROP CONSTRAINT "collection_product_variants_product_varia_productVariantId_fkey";

-- DropForeignKey
ALTER TABLE "collection_product_variants_product_variant" DROP CONSTRAINT "collection_product_variants_product_variant_collectionId_fkey";

-- AlterTable
ALTER TABLE "collection" ADD COLUMN     "depth" INTEGER NOT NULL,
ADD COLUMN     "numchild" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "path" TEXT NOT NULL;

-- DropTable
DROP TABLE "collection_closure";

-- DropTable
DROP TABLE "collection_product_variants_product_variant";

-- CreateTable
CREATE TABLE "collection_product_variants" (
    "collectionId" INTEGER NOT NULL,
    "productVariantId" INTEGER NOT NULL,

    CONSTRAINT "collection_product_variants_pkey" PRIMARY KEY ("collectionId","productVariantId")
);

-- CreateIndex
CREATE INDEX "collection_product_variants_collectionid" ON "collection_product_variants"("collectionId");

-- CreateIndex
CREATE INDEX "collection_product_variants_productvariantid" ON "collection_product_variants"("productVariantId");

-- CreateIndex
CREATE UNIQUE INDEX "collection_path_key" ON "collection"("path");

-- CreateIndex
CREATE INDEX "collection_path_idx" ON "collection"("path");

-- AddForeignKey
ALTER TABLE "collection_product_variants" ADD CONSTRAINT "collection_product_variants_product_varia_productVariantId_fkey" FOREIGN KEY ("productVariantId") REFERENCES "product_variant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "collection_product_variants" ADD CONSTRAINT "collection_product_variants_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;
