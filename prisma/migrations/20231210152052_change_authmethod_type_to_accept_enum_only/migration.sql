/*
  Warnings:

  - The `type` column on the `authentication_method` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('CUSTOMER', 'ADMIN');

-- AlterTable
ALTER TABLE "authentication_method" DROP COLUMN "type",
ADD COLUMN     "type" "UserType";
