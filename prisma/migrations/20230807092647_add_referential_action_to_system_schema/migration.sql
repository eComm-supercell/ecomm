-- DropForeignKey
ALTER TABLE "SystemConfig" DROP CONSTRAINT "SystemConfig_mobileAppConfigId_fkey";

-- AddForeignKey
ALTER TABLE "SystemConfig" ADD CONSTRAINT "SystemConfig_mobileAppConfigId_fkey" FOREIGN KEY ("mobileAppConfigId") REFERENCES "MobileAppConfig"("id") ON DELETE CASCADE ON UPDATE CASCADE;
