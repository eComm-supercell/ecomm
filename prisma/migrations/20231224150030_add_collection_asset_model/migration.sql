-- CreateEnum
CREATE TYPE "DeviceLayout" AS ENUM ('mobile', 'desktop', 'tablet');

-- CreateTable
CREATE TABLE "collection_asset" (
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "layout" "DeviceLayout" NOT NULL,
    "position" INTEGER NOT NULL,
    "id" SERIAL NOT NULL,
    "assetId" INTEGER NOT NULL,
    "collectionId" INTEGER NOT NULL,

    CONSTRAINT "collection_asset_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "collection_asset" ADD CONSTRAINT "collection_asset_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "asset"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "collection_asset" ADD CONSTRAINT "collection_asset_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "collection"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
