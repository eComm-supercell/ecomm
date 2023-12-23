/*
  Warnings:

  - You are about to drop the column `groupId` on the `product_option` table. All the data in the column will be lost.
  - You are about to drop the column `baseId` on the `product_option_group_translation` table. All the data in the column will be lost.
  - You are about to drop the column `baseId` on the `product_translation` table. All the data in the column will be lost.
  - You are about to drop the column `featuredAssetId` on the `product_variant` table. All the data in the column will be lost.
  - You are about to drop the `product_variant_facet_values_facet_value` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_variant_options_product_option` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `productOptiongroupId` to the `product_option` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "product_option" DROP CONSTRAINT "product_option_groupId_fkey";

-- DropForeignKey
ALTER TABLE "product_option_group_translation" DROP CONSTRAINT "product_option_group_translation_baseId_fkey";

-- DropForeignKey
ALTER TABLE "product_translation" DROP CONSTRAINT "product_translation_baseId_fkey";

-- DropForeignKey
ALTER TABLE "product_variant" DROP CONSTRAINT "product_variant_featuredAssetId_fkey";

-- DropForeignKey
ALTER TABLE "product_variant_facet_values_facet_value" DROP CONSTRAINT "product_variant_facet_values_facet_value_facetValueId_fkey";

-- DropForeignKey
ALTER TABLE "product_variant_facet_values_facet_value" DROP CONSTRAINT "product_variant_facet_values_facet_value_productVariantId_fkey";

-- DropForeignKey
ALTER TABLE "product_variant_options_product_option" DROP CONSTRAINT "product_variant_options_product_option_productOptionId_fkey";

-- DropForeignKey
ALTER TABLE "product_variant_options_product_option" DROP CONSTRAINT "product_variant_options_product_option_productVariantId_fkey";

-- DropIndex
DROP INDEX "product_featuredassetid";

-- DropIndex
DROP INDEX "product_option_groupid";

-- DropIndex
DROP INDEX "product_option_group_translation_baseid";

-- DropIndex
DROP INDEX "IDX_f4a2ec16ba86d277b6faa0b67b";

-- DropIndex
DROP INDEX "product_translation_baseid";

-- DropIndex
DROP INDEX "product_variant_featuredassetid";

-- AlterTable
ALTER TABLE "product_option" DROP COLUMN "groupId",
ADD COLUMN     "productOptiongroupId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "product_option_group_translation" DROP COLUMN "baseId",
ADD COLUMN     "productOptionGroupId" INTEGER;

-- AlterTable
ALTER TABLE "product_translation" DROP COLUMN "baseId",
ADD COLUMN     "productId" INTEGER;

-- AlterTable
ALTER TABLE "product_variant" DROP COLUMN "featuredAssetId",
ADD COLUMN     "assetId" INTEGER,
ALTER COLUMN "sku" DROP NOT NULL,
ALTER COLUMN "outOfStockThreshold" DROP NOT NULL,
ALTER COLUMN "useGlobalOutOfStockThreshold" DROP NOT NULL,
ALTER COLUMN "trackInventory" DROP NOT NULL;

-- DropTable
DROP TABLE "product_variant_facet_values_facet_value";

-- DropTable
DROP TABLE "product_variant_options_product_option";

-- CreateTable
CREATE TABLE "product_variant_facet_values" (
    "productVariantId" INTEGER NOT NULL,
    "facetValueId" INTEGER NOT NULL,

    CONSTRAINT "product_variant_facet_values_pkey" PRIMARY KEY ("productVariantId","facetValueId")
);

-- CreateTable
CREATE TABLE "product_variant_options" (
    "productVariantId" INTEGER NOT NULL,
    "productOptionId" INTEGER NOT NULL,

    CONSTRAINT "product_variant_options_pkey" PRIMARY KEY ("productVariantId","productOptionId")
);

-- CreateIndex
CREATE INDEX "product_variant_facet_values_facet_value_facetvalueid" ON "product_variant_facet_values"("facetValueId");

-- CreateIndex
CREATE INDEX "product_variant_facet_values_facet_value_productvariantid" ON "product_variant_facet_values"("productVariantId");

-- CreateIndex
CREATE INDEX "product_variant_featuredassetid" ON "product_variant"("assetId");

-- AddForeignKey
ALTER TABLE "product_option" ADD CONSTRAINT "product_option_productOptiongroupId_fkey" FOREIGN KEY ("productOptiongroupId") REFERENCES "product_option_group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_option_group_translation" ADD CONSTRAINT "product_option_group_translation_productOptionGroupId_fkey" FOREIGN KEY ("productOptionGroupId") REFERENCES "product_option_group"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_translation" ADD CONSTRAINT "product_translation_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_variant" ADD CONSTRAINT "product_variant_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "asset"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_variant_facet_values" ADD CONSTRAINT "product_variant_facet_values_productVariantId_fkey" FOREIGN KEY ("productVariantId") REFERENCES "product_variant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_variant_facet_values" ADD CONSTRAINT "product_variant_facet_values_facetValueId_fkey" FOREIGN KEY ("facetValueId") REFERENCES "facet_value"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_variant_options" ADD CONSTRAINT "product_variant_options_productVariantId_fkey" FOREIGN KEY ("productVariantId") REFERENCES "product_variant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_variant_options" ADD CONSTRAINT "product_variant_options_productOptionId_fkey" FOREIGN KEY ("productOptionId") REFERENCES "product_option"("id") ON DELETE CASCADE ON UPDATE CASCADE;
