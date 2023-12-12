/*
  Warnings:

  - The values [LOCAL,GOOGLE] on the enum `AuthenticationStartegy` will be removed. If these variants are still used in the database, this will fail.
  - The `identifier` column on the `authentication_method` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "AuthenticationIdentifier" AS ENUM ('GOOGLE');

-- AlterEnum
BEGIN;
CREATE TYPE "AuthenticationStartegy_new" AS ENUM ('NATIVE', 'OAUTH');
ALTER TABLE "authentication_method" ALTER COLUMN "strategy" TYPE "AuthenticationStartegy_new" USING ("strategy"::text::"AuthenticationStartegy_new");
ALTER TYPE "AuthenticationStartegy" RENAME TO "AuthenticationStartegy_old";
ALTER TYPE "AuthenticationStartegy_new" RENAME TO "AuthenticationStartegy";
DROP TYPE "AuthenticationStartegy_old";
COMMIT;

-- AlterTable
ALTER TABLE "authentication_method" DROP COLUMN "identifier",
ADD COLUMN     "identifier" "AuthenticationIdentifier";
