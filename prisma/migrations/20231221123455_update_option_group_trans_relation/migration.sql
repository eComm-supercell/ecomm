/*
  Warnings:

  - Made the column `productOptionGroupId` on table `product_option_group_translation` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "product_option_group_translation" ALTER COLUMN "productOptionGroupId" SET NOT NULL;
