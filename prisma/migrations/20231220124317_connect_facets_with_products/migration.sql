-- CreateTable
CREATE TABLE "product_facet_values" (
    "productId" INTEGER NOT NULL,
    "facetValueId" INTEGER NOT NULL,

    CONSTRAINT "product_facet_values_pkey" PRIMARY KEY ("productId","facetValueId")
);

-- AddForeignKey
ALTER TABLE "product_facet_values" ADD CONSTRAINT "product_facet_values_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_facet_values" ADD CONSTRAINT "product_facet_values_facetValueId_fkey" FOREIGN KEY ("facetValueId") REFERENCES "facet_value"("id") ON DELETE CASCADE ON UPDATE CASCADE;
