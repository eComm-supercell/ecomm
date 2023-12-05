/*
  Warnings:

  - Made the column `sortOrder` on table `Category` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "sortOrder" SET NOT NULL,
ALTER COLUMN "sortOrder" SET DEFAULT 0;
