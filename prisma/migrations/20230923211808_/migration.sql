/*
  Warnings:

  - You are about to drop the column `altText` on the `ProductImage` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `ProductImage` table. All the data in the column will be lost.
  - Made the column `sortOrder` on table `ProductImage` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ProductImage" DROP COLUMN "altText",
DROP COLUMN "status",
ADD COLUMN     "isOptmized" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "sortOrder" SET NOT NULL;
