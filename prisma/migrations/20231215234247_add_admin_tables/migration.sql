/*
  Warnings:

  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ApiKey` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AuditLog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `City` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Coupon` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DeliveryBoy` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `InventoryLog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MobileAppConfig` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Notification` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `NotificationToken` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OldProfile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OldUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OrderItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PaymentDetails` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductImage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductVariant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductVariantImage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Province` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Shop` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ShopDetails` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SubOrderItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SystemConfig` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Ucode` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Wallet` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WalletTransaction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CategoryToProduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_OldUserToShop` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProductToTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cart` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_cityId_fkey";

-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_profileId_fkey";

-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_provinceId_fkey";

-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_authorId_fkey";

-- DropForeignKey
ALTER TABLE "City" DROP CONSTRAINT "City_provinceId_fkey";

-- DropForeignKey
ALTER TABLE "Coupon" DROP CONSTRAINT "Coupon_referrerId_fkey";

-- DropForeignKey
ALTER TABLE "InventoryLog" DROP CONSTRAINT "InventoryLog_productId_fkey";

-- DropForeignKey
ALTER TABLE "InventoryLog" DROP CONSTRAINT "InventoryLog_productvariantId_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_userId_fkey";

-- DropForeignKey
ALTER TABLE "NotificationToken" DROP CONSTRAINT "NotificationToken_userId_fkey";

-- DropForeignKey
ALTER TABLE "OldProfile" DROP CONSTRAINT "OldProfile_userId_fkey";

-- DropForeignKey
ALTER TABLE "OldUser" DROP CONSTRAINT "OldUser_deliveryBoyId_fkey";

-- DropForeignKey
ALTER TABLE "OldUser" DROP CONSTRAINT "OldUser_walletId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_addressId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_paymentDetailsId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_shopId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_userId_fkey";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_orderId_fkey";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_productId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_shopId_fkey";

-- DropForeignKey
ALTER TABLE "ProductImage" DROP CONSTRAINT "ProductImage_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductVariant" DROP CONSTRAINT "ProductVariant_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductVariantImage" DROP CONSTRAINT "ProductVariantImage_productVariantId_fkey";

-- DropForeignKey
ALTER TABLE "Shop" DROP CONSTRAINT "Shop_shopDetailsId_fkey";

-- DropForeignKey
ALTER TABLE "ShopDetails" DROP CONSTRAINT "ShopDetails_cityId_fkey";

-- DropForeignKey
ALTER TABLE "ShopDetails" DROP CONSTRAINT "ShopDetails_provinceId_fkey";

-- DropForeignKey
ALTER TABLE "SubOrderItem" DROP CONSTRAINT "SubOrderItem_productId_fkey";

-- DropForeignKey
ALTER TABLE "SystemConfig" DROP CONSTRAINT "SystemConfig_mobileAppConfigId_fkey";

-- DropForeignKey
ALTER TABLE "WalletTransaction" DROP CONSTRAINT "WalletTransaction_walletId_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToProduct" DROP CONSTRAINT "_CategoryToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToProduct" DROP CONSTRAINT "_CategoryToProduct_B_fkey";

-- DropForeignKey
ALTER TABLE "_OldUserToShop" DROP CONSTRAINT "_OldUserToShop_A_fkey";

-- DropForeignKey
ALTER TABLE "_OldUserToShop" DROP CONSTRAINT "_OldUserToShop_B_fkey";

-- DropForeignKey
ALTER TABLE "_ProductToTag" DROP CONSTRAINT "_ProductToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductToTag" DROP CONSTRAINT "_ProductToTag_B_fkey";

-- DropForeignKey
ALTER TABLE "cart" DROP CONSTRAINT "cart_productId_fkey";

-- DropForeignKey
ALTER TABLE "cart" DROP CONSTRAINT "cart_userId_fkey";

-- DropTable
DROP TABLE "Address";

-- DropTable
DROP TABLE "ApiKey";

-- DropTable
DROP TABLE "AuditLog";

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "City";

-- DropTable
DROP TABLE "Coupon";

-- DropTable
DROP TABLE "DeliveryBoy";

-- DropTable
DROP TABLE "InventoryLog";

-- DropTable
DROP TABLE "MobileAppConfig";

-- DropTable
DROP TABLE "Notification";

-- DropTable
DROP TABLE "NotificationToken";

-- DropTable
DROP TABLE "OldProfile";

-- DropTable
DROP TABLE "OldUser";

-- DropTable
DROP TABLE "Order";

-- DropTable
DROP TABLE "OrderItem";

-- DropTable
DROP TABLE "PaymentDetails";

-- DropTable
DROP TABLE "Product";

-- DropTable
DROP TABLE "ProductImage";

-- DropTable
DROP TABLE "ProductVariant";

-- DropTable
DROP TABLE "ProductVariantImage";

-- DropTable
DROP TABLE "Province";

-- DropTable
DROP TABLE "Shop";

-- DropTable
DROP TABLE "ShopDetails";

-- DropTable
DROP TABLE "SubOrderItem";

-- DropTable
DROP TABLE "SystemConfig";

-- DropTable
DROP TABLE "Tag";

-- DropTable
DROP TABLE "Ucode";

-- DropTable
DROP TABLE "Wallet";

-- DropTable
DROP TABLE "WalletTransaction";

-- DropTable
DROP TABLE "_CategoryToProduct";

-- DropTable
DROP TABLE "_OldUserToShop";

-- DropTable
DROP TABLE "_ProductToTag";

-- DropTable
DROP TABLE "cart";

-- CreateTable
CREATE TABLE "asset" (
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR NOT NULL,
    "type" VARCHAR NOT NULL,
    "mimeType" VARCHAR NOT NULL,
    "width" INTEGER NOT NULL DEFAULT 0,
    "height" INTEGER NOT NULL DEFAULT 0,
    "fileSize" INTEGER NOT NULL,
    "source" VARCHAR NOT NULL,
    "preview" VARCHAR NOT NULL,
    "id" SERIAL NOT NULL,

    CONSTRAINT "asset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "collection" (
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isRoot" BOOLEAN NOT NULL DEFAULT false,
    "position" INTEGER NOT NULL,
    "isPrivate" BOOLEAN NOT NULL DEFAULT false,
    "id" SERIAL NOT NULL,
    "parentId" INTEGER,
    "featuredAssetId" INTEGER,

    CONSTRAINT "collection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "collection_closure" (
    "id_ancestor" INTEGER NOT NULL,
    "id_descendant" INTEGER NOT NULL,

    CONSTRAINT "collection_closure_pkey" PRIMARY KEY ("id_ancestor","id_descendant")
);

-- CreateTable
CREATE TABLE "collection_product_variants_product_variant" (
    "collectionId" INTEGER NOT NULL,
    "productVariantId" INTEGER NOT NULL,

    CONSTRAINT "collection_product_variants_product_variant_pkey" PRIMARY KEY ("collectionId","productVariantId")
);

-- CreateTable
CREATE TABLE "collection_translation" (
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "languageCode" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "slug" VARCHAR NOT NULL,
    "description" TEXT NOT NULL,
    "id" SERIAL NOT NULL,
    "baseId" INTEGER,

    CONSTRAINT "collection_translation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "facet" (
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isPrivate" BOOLEAN NOT NULL DEFAULT false,
    "code" VARCHAR NOT NULL,
    "id" SERIAL NOT NULL,

    CONSTRAINT "facet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "facet_translation" (
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "languageCode" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "id" SERIAL NOT NULL,
    "baseId" INTEGER,

    CONSTRAINT "facet_translation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "facet_value" (
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "code" VARCHAR NOT NULL,
    "id" SERIAL NOT NULL,
    "facetId" INTEGER NOT NULL,

    CONSTRAINT "facet_value_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "facet_value_translation" (
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "languageCode" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "id" SERIAL NOT NULL,
    "baseId" INTEGER,

    CONSTRAINT "facet_value_translation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "global_settings" (
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "availableLanguages" TEXT NOT NULL,
    "trackInventory" BOOLEAN NOT NULL DEFAULT true,
    "outOfStockThreshold" INTEGER NOT NULL DEFAULT 0,
    "id" SERIAL NOT NULL,

    CONSTRAINT "global_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product" (
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(6),
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "id" SERIAL NOT NULL,
    "featuredAssetId" INTEGER,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_asset" (
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assetId" INTEGER NOT NULL,
    "position" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "id" SERIAL NOT NULL,

    CONSTRAINT "product_asset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_option" (
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(6),
    "code" VARCHAR NOT NULL,
    "id" SERIAL NOT NULL,
    "groupId" INTEGER NOT NULL,

    CONSTRAINT "product_option_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_option_group" (
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(6),
    "code" VARCHAR NOT NULL,
    "id" SERIAL NOT NULL,
    "productId" INTEGER,

    CONSTRAINT "product_option_group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_option_group_translation" (
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "languageCode" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "id" SERIAL NOT NULL,
    "baseId" INTEGER,

    CONSTRAINT "product_option_group_translation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_option_translation" (
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "languageCode" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "id" SERIAL NOT NULL,
    "baseId" INTEGER,

    CONSTRAINT "product_option_translation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_translation" (
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "languageCode" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "slug" VARCHAR NOT NULL,
    "description" TEXT NOT NULL,
    "id" SERIAL NOT NULL,
    "baseId" INTEGER,

    CONSTRAINT "product_translation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_variant" (
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(6),
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "sku" VARCHAR NOT NULL,
    "outOfStockThreshold" INTEGER NOT NULL DEFAULT 0,
    "useGlobalOutOfStockThreshold" BOOLEAN NOT NULL DEFAULT true,
    "trackInventory" VARCHAR NOT NULL DEFAULT 'INHERIT',
    "id" SERIAL NOT NULL,
    "productId" INTEGER,
    "featuredAssetId" INTEGER,

    CONSTRAINT "product_variant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_variant_asset" (
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assetId" INTEGER NOT NULL,
    "position" INTEGER NOT NULL,
    "productVariantId" INTEGER NOT NULL,
    "id" SERIAL NOT NULL,

    CONSTRAINT "product_variant_asset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_variant_facet_values_facet_value" (
    "productVariantId" INTEGER NOT NULL,
    "facetValueId" INTEGER NOT NULL,

    CONSTRAINT "product_variant_facet_values_facet_value_pkey" PRIMARY KEY ("productVariantId","facetValueId")
);

-- CreateTable
CREATE TABLE "product_variant_options_product_option" (
    "productVariantId" INTEGER NOT NULL,
    "productOptionId" INTEGER NOT NULL,

    CONSTRAINT "product_variant_options_product_option_pkey" PRIMARY KEY ("productVariantId","productOptionId")
);

-- CreateTable
CREATE TABLE "product_variant_price" (
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "currencyCode" VARCHAR NOT NULL,
    "id" SERIAL NOT NULL,
    "channelId" INTEGER,
    "price" INTEGER NOT NULL,
    "variantId" INTEGER,

    CONSTRAINT "product_variant_price_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_variant_translation" (
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "languageCode" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "id" SERIAL NOT NULL,
    "baseId" INTEGER,

    CONSTRAINT "product_variant_translation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "collection_featuredAssetId" ON "collection"("featuredAssetId");

-- CreateIndex
CREATE INDEX "collection_closure_asc" ON "collection_closure"("id_ancestor");

-- CreateIndex
CREATE INDEX "collection_closure_desc" ON "collection_closure"("id_descendant");

-- CreateIndex
CREATE INDEX "collection_product_variants_product_variant_collectionid" ON "collection_product_variants_product_variant"("collectionId");

-- CreateIndex
CREATE INDEX "collection_product_variants_product_variant_productvariantid" ON "collection_product_variants_product_variant"("productVariantId");

-- CreateIndex
CREATE INDEX "collection_translation_baseid_idx" ON "collection_translation"("baseId");

-- CreateIndex
CREATE INDEX "collection_translation_slug_idx" ON "collection_translation"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "facet_code_key" ON "facet"("code");

-- CreateIndex
CREATE INDEX "facet_translation_baseid" ON "facet_translation"("baseId");

-- CreateIndex
CREATE INDEX "facet_value_facetid" ON "facet_value"("facetId");

-- CreateIndex
CREATE INDEX "facet_value_translation_baseid" ON "facet_value_translation"("baseId");

-- CreateIndex
CREATE INDEX "product_featuredassetid" ON "product"("featuredAssetId");

-- CreateIndex
CREATE INDEX "product_asset_assetid" ON "product_asset"("assetId");

-- CreateIndex
CREATE INDEX "product_asset_productid" ON "product_asset"("productId");

-- CreateIndex
CREATE INDEX "product_option_groupid" ON "product_option"("groupId");

-- CreateIndex
CREATE INDEX "product_option_group_productid" ON "product_option_group"("productId");

-- CreateIndex
CREATE INDEX "product_option_group_translation_baseid" ON "product_option_group_translation"("baseId");

-- CreateIndex
CREATE INDEX "product_option_translation_baseid" ON "product_option_translation"("baseId");

-- CreateIndex
CREATE INDEX "IDX_f4a2ec16ba86d277b6faa0b67b" ON "product_translation"("slug");

-- CreateIndex
CREATE INDEX "product_translation_baseid" ON "product_translation"("baseId");

-- CreateIndex
CREATE INDEX "product_variant_featuredassetid" ON "product_variant"("featuredAssetId");

-- CreateIndex
CREATE INDEX "product_variant_productid" ON "product_variant"("productId");

-- CreateIndex
CREATE INDEX "product_variant_asset_id" ON "product_variant_asset"("assetId");

-- CreateIndex
CREATE INDEX "product_variant_asset_prod_variantid" ON "product_variant_asset"("productVariantId");

-- CreateIndex
CREATE INDEX "product_variant_facet_values_facet_value_facetvalueid" ON "product_variant_facet_values_facet_value"("facetValueId");

-- CreateIndex
CREATE INDEX "product_variant_facet_values_facet_value_productvariantid" ON "product_variant_facet_values_facet_value"("productVariantId");

-- CreateIndex
CREATE INDEX "product_variant_options_product_option_productvariantid" ON "product_variant_options_product_option"("productVariantId");

-- CreateIndex
CREATE INDEX "product_variant_price_variantid" ON "product_variant_price"("variantId");

-- CreateIndex
CREATE INDEX "product_variant_translation_baseid" ON "product_variant_translation"("baseId");

-- AddForeignKey
ALTER TABLE "collection" ADD CONSTRAINT "collection_featuredAssetId_fkey" FOREIGN KEY ("featuredAssetId") REFERENCES "asset"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "collection" ADD CONSTRAINT "collection_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "collection"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "collection_closure" ADD CONSTRAINT "collection_closure_id_ancestor_fkey" FOREIGN KEY ("id_ancestor") REFERENCES "collection"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "collection_closure" ADD CONSTRAINT "collection_closure_id_descendant_fkey" FOREIGN KEY ("id_descendant") REFERENCES "collection"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "collection_product_variants_product_variant" ADD CONSTRAINT "collection_product_variants_product_varia_productVariantId_fkey" FOREIGN KEY ("productVariantId") REFERENCES "product_variant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "collection_product_variants_product_variant" ADD CONSTRAINT "collection_product_variants_product_variant_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "collection_translation" ADD CONSTRAINT "collection_translation_baseId_fkey" FOREIGN KEY ("baseId") REFERENCES "collection"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "facet_translation" ADD CONSTRAINT "facet_translation_baseId_fkey" FOREIGN KEY ("baseId") REFERENCES "facet"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "facet_value" ADD CONSTRAINT "facet_value_facetId_fkey" FOREIGN KEY ("facetId") REFERENCES "facet"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "facet_value_translation" ADD CONSTRAINT "facet_value_translation_baseId_fkey" FOREIGN KEY ("baseId") REFERENCES "facet_value"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_featuredAssetId_fkey" FOREIGN KEY ("featuredAssetId") REFERENCES "asset"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_asset" ADD CONSTRAINT "product_asset_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "asset"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_asset" ADD CONSTRAINT "product_asset_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_option" ADD CONSTRAINT "product_option_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "product_option_group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_option_group" ADD CONSTRAINT "product_option_group_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_option_group_translation" ADD CONSTRAINT "product_option_group_translation_baseId_fkey" FOREIGN KEY ("baseId") REFERENCES "product_option_group"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_option_translation" ADD CONSTRAINT "product_option_translation_baseId_fkey" FOREIGN KEY ("baseId") REFERENCES "product_option"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_translation" ADD CONSTRAINT "product_translation_baseId_fkey" FOREIGN KEY ("baseId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_variant" ADD CONSTRAINT "product_variant_featuredAssetId_fkey" FOREIGN KEY ("featuredAssetId") REFERENCES "asset"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_variant" ADD CONSTRAINT "product_variant_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_variant_asset" ADD CONSTRAINT "product_variant_asset_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "asset"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_variant_asset" ADD CONSTRAINT "product_variant_asset_productVariantId_fkey" FOREIGN KEY ("productVariantId") REFERENCES "product_variant"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_variant_facet_values_facet_value" ADD CONSTRAINT "product_variant_facet_values_facet_value_facetValueId_fkey" FOREIGN KEY ("facetValueId") REFERENCES "facet_value"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_variant_facet_values_facet_value" ADD CONSTRAINT "product_variant_facet_values_facet_value_productVariantId_fkey" FOREIGN KEY ("productVariantId") REFERENCES "product_variant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_variant_options_product_option" ADD CONSTRAINT "product_variant_options_product_option_productOptionId_fkey" FOREIGN KEY ("productOptionId") REFERENCES "product_option"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_variant_options_product_option" ADD CONSTRAINT "product_variant_options_product_option_productVariantId_fkey" FOREIGN KEY ("productVariantId") REFERENCES "product_variant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_variant_price" ADD CONSTRAINT "product_variant_price_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "product_variant"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_variant_translation" ADD CONSTRAINT "product_variant_translation_baseId_fkey" FOREIGN KEY ("baseId") REFERENCES "product_variant"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
