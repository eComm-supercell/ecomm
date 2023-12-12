/*
  Warnings:

  - The `strategy` column on the `authentication_method` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "AuthenticationStartegy" AS ENUM ('LOCAL', 'GOOGLE');

-- AlterTable
ALTER TABLE "authentication_method" DROP COLUMN "strategy",
ADD COLUMN     "strategy" "AuthenticationStartegy";
