/*
  Warnings:

  - You are about to alter the column `pricePerKm` on the `SystemConfig` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to alter the column `minOrderAmount` on the `SystemConfig` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.

*/
-- AlterTable
ALTER TABLE "SystemConfig" ALTER COLUMN "pricePerKm" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "minOrderAmount" SET DATA TYPE DECIMAL(65,30);
