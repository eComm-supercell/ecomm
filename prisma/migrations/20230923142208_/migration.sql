/*
  Warnings:

  - You are about to drop the column `isBusy` on the `Shop` table. All the data in the column will be lost.
  - You are about to drop the column `sellerStatus` on the `Shop` table. All the data in the column will be lost.
  - The `status` column on the `Shop` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ShopStatus" AS ENUM ('pending', 'approved', 'banned', 'closed', 'active', 'paused', 'busy');

-- AlterTable
ALTER TABLE "Shop" DROP COLUMN "isBusy",
DROP COLUMN "sellerStatus",
DROP COLUMN "status",
ADD COLUMN     "status" "ShopStatus" NOT NULL DEFAULT 'pending';
