/*
  Warnings:

  - Changed the type of `languageCode` on the `collection_translation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "LanguageCode" AS ENUM ('en', 'ar');

-- AlterTable
ALTER TABLE "collection_translation" DROP COLUMN "languageCode",
ADD COLUMN     "languageCode" "LanguageCode" NOT NULL;
