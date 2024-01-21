/*
  Warnings:

  - The `type` column on the `asset` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "asset" ALTER COLUMN "name" DROP NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" "AssetType",
ALTER COLUMN "mimeType" DROP NOT NULL,
ALTER COLUMN "width" DROP NOT NULL,
ALTER COLUMN "height" DROP NOT NULL,
ALTER COLUMN "fileSize" DROP NOT NULL,
ALTER COLUMN "preview" DROP NOT NULL;
