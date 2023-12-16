-- Title: Exodus SQL 
-- Description: SQL inspired by standarized modern eCommmerce systems.
-- Authentication and user management
-- Table: public.role
-- DROP TABLE IF EXISTS public.role;
CREATE TABLE IF NOT EXISTS public.role (
    "createdAt" timestamp(6) without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp(6) without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    code character varying COLLATE pg_catalog."default" NOT NULL,
    description character varying COLLATE pg_catalog."default" NOT NULL,
    permissions text COLLATE pg_catalog."default" NOT NULL,
    id serial,
    PRIMARY KEY (id)
) TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.role OWNER to postgres;
-- Table: public.authentication_method
-- DROP TABLE IF EXISTS public.authentication_method;
CREATE TABLE IF NOT EXISTS public.authentication_method (
    "createdAt" timestamp(6) without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp(6) without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "passwordHash" character varying COLLATE pg_catalog."default",
    "verificationToken" character varying COLLATE pg_catalog."default",
    "passwordResetToken" character varying COLLATE pg_catalog."default",
    "identifierChangeToken" character varying COLLATE pg_catalog."default",
    "pendingIdentifier" character varying COLLATE pg_catalog."default",
    "externalIdentifier" character varying COLLATE pg_catalog."default",
    metadata text COLLATE pg_catalog."default",
    id serial PRIMARY KEY,
    type "UserType",
    strategy "AuthenticationStartegy",
    identifier "AuthenticationIdentifier"
) TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.authentication_method OWNER TO postgres;
-- Table: public."user"
CREATE TABLE IF NOT EXISTS public."user" (
    "createdAt" timestamp(6) without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp(6) without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" timestamp(6) without time zone,
    identifier character varying COLLATE pg_catalog."default",
    verified boolean NOT NULL DEFAULT false,
    "lastLogin" timestamp(6) without time zone,
    id serial PRIMARY KEY,
    "emailAddress" character varying COLLATE pg_catalog."default" UNIQUE,
    "phoneNumber" character varying COLLATE pg_catalog."default" UNIQUE,
    -- Add the foreign key reference to authentication_method
    "authentication_methodId" integer UNIQUE,
    FOREIGN KEY ("authentication_methodId") REFERENCES public.authentication_method (id) MATCH SIMPLE ON UPDATE CASCADE ON DELETE
    SET NULL
) TABLESPACE pg_default;
ALTER TABLE IF EXISTS public."user" OWNER TO postgres;
-- Index: user_emailAddress_key
-- DROP INDEX IF EXISTS public."user_emailAddress_key";
CREATE UNIQUE INDEX IF NOT EXISTS "user_emailAddress_key" ON public."user" USING btree (
    "emailAddress" COLLATE pg_catalog."default" ASC NULLS LAST
) TABLESPACE pg_default;
-- Index: user_phoneNumber_key
-- DROP INDEX IF EXISTS public."user_phoneNumber_key";
CREATE UNIQUE INDEX IF NOT EXISTS "user_phoneNumber_key" ON public."user" USING btree (
    "phoneNumber" COLLATE pg_catalog."default" ASC NULLS LAST
) TABLESPACE pg_default;
-- Table: public.user_roles_role
-- DROP TABLE IF EXISTS public.user_roles_role;
CREATE TABLE IF NOT EXISTS public.user_roles_role (
    "userId" integer NOT NULL,
    "roleId" integer NOT NULL,
    PRIMARY KEY ("userId", "roleId"),
    FOREIGN KEY ("roleId") REFERENCES public.role (id) MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY ("userId") REFERENCES public."user" (id) MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE
) TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.user_roles_role OWNER to postgres;
-- Index: user_roles_role_roleId_idx
-- DROP INDEX IF EXISTS public."user_roles_role_roleId_idx";
CREATE INDEX IF NOT EXISTS "user_roles_role_roleId_idx" ON public.user_roles_role USING btree ("roleId" ASC NULLS LAST) TABLESPACE pg_default;
-- Index: user_roles_role_userId_idx
-- DROP INDEX IF EXISTS public."user_roles_role_userId_idx";
CREATE INDEX IF NOT EXISTS "user_roles_role_userId_idx" ON public.user_roles_role USING btree ("userId" ASC NULLS LAST) TABLESPACE pg_default;
-- Table: public.profile
-- DROP TABLE IF EXISTS public.profile;
CREATE TABLE IF NOT EXISTS public.profile (
    "createdAt" timestamp(6) without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp(6) without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" timestamp(6) without time zone,
    "firstName" character varying COLLATE pg_catalog."default" NOT NULL,
    "lastName" character varying COLLATE pg_catalog."default",
    id serial,
    "userId" integer,
    gender "Gender" NOT NULL,
    age integer DEFAULT 12,
    PRIMARY KEY (id),
    FOREIGN KEY ("userId") REFERENCES public."user" (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION
) TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.profile OWNER to postgres;
-- Index: profile_userId_key
-- DROP INDEX IF EXISTS public."profile_userId_key";
CREATE UNIQUE INDEX IF NOT EXISTS "profile_userId_key" ON public.profile USING btree ("userId" ASC NULLS LAST) TABLESPACE pg_default;
-- Table: public.session
-- DROP TABLE IF EXISTS public.session;
CREATE TABLE IF NOT EXISTS public.session (
    "createdAt" timestamp(6) without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp(6) without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    token character varying COLLATE pg_catalog."default" NOT NULL,
    expires timestamp(6) without time zone NOT NULL,
    invalidated boolean NOT NULL,
    "authenticationStrategy" character varying COLLATE pg_catalog."default",
    id serial,
    type character varying COLLATE pg_catalog."default" NOT NULL,
    "userId" integer,
    PRIMARY KEY (id),
    FOREIGN KEY ("userId") REFERENCES public."user" (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION
) TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.session OWNER to postgres;
-- Index: session_token_key
-- DROP INDEX IF EXISTS public.session_token_key;
CREATE UNIQUE INDEX IF NOT EXISTS session_token_key ON public.session USING btree (
    token COLLATE pg_catalog."default" ASC NULLS LAST
) TABLESPACE pg_default;
-- Index: session_type_idx
-- DROP INDEX IF EXISTS public.session_type_idx;
CREATE INDEX IF NOT EXISTS session_type_idx ON public.session USING btree (type COLLATE pg_catalog."default" ASC NULLS LAST) TABLESPACE pg_default;
-- Index: session_userId_idx
-- DROP INDEX IF EXISTS public."session_userId_idx";
CREATE INDEX IF NOT EXISTS "session_userId_idx" ON public.session USING btree ("userId" ASC NULLS LAST) TABLESPACE pg_default;
-- Table: public.asset
-- DROP TABLE IF EXISTS public.asset;
CREATE TABLE IF NOT EXISTS public.asset (
    "createdAt" timestamp without time zone NOT NULL DEFAULT now(),
    "updatedAt" timestamp without time zone NOT NULL DEFAULT now(),
    name character varying COLLATE pg_catalog."default" NOT NULL,
    type character varying COLLATE pg_catalog."default" NOT NULL,
    "mimeType" character varying COLLATE pg_catalog."default" NOT NULL,
    width integer NOT NULL DEFAULT 0,
    height integer NOT NULL DEFAULT 0,
    "fileSize" integer NOT NULL,
    source character varying COLLATE pg_catalog."default" NOT NULL,
    preview character varying COLLATE pg_catalog."default" NOT NULL,
    id serial,
    PRIMARY KEY (id)
) TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.asset OWNER to postgres;
-- Table: public.collection
-- DROP TABLE IF EXISTS public.collection;
CREATE TABLE IF NOT EXISTS public.collection (
    "createdAt" timestamp without time zone NOT NULL DEFAULT now(),
    "updatedAt" timestamp without time zone NOT NULL DEFAULT now(),
    "isRoot" boolean NOT NULL DEFAULT false,
    "position" integer NOT NULL,
    "isPrivate" boolean NOT NULL DEFAULT false,
    id serial,
    "parentId" integer,
    "featuredAssetId" integer,
    PRIMARY KEY (id),
    FOREIGN KEY ("parentId") REFERENCES public.collection (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION,
    FOREIGN KEY ("featuredAssetId") REFERENCES public.asset (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE
    SET NULL
) TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.collection OWNER to postgres;
-- Index: public.collection_featuredAssetId
-- DROP INDEX IF EXISTS public.collection_featuredAssetId;
CREATE INDEX IF NOT EXISTS "collection_featuredAssetId" ON public.collection USING btree ("featuredAssetId" ASC NULLS LAST) TABLESPACE pg_default;
-- Table: public.collection_translation
-- DROP TABLE IF EXISTS public.collection_translation;
CREATE TABLE IF NOT EXISTS public.collection_translation (
    "createdAt" timestamp without time zone NOT NULL DEFAULT now(),
    "updatedAt" timestamp without time zone NOT NULL DEFAULT now(),
    "languageCode" character varying COLLATE pg_catalog."default" NOT NULL,
    name character varying COLLATE pg_catalog."default" NOT NULL,
    slug character varying COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default" NOT NULL,
    id serial,
    "baseId" integer,
    PRIMARY KEY (id),
    FOREIGN KEY ("baseId") REFERENCES public.collection (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE CASCADE
) TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.collection_translation OWNER to postgres;
-- Index: collection_translation_slug_idx
-- DROP INDEX IF EXISTS public.collection_translation_slug_idx;
CREATE INDEX IF NOT EXISTS collection_translation_slug_idx ON public.collection_translation USING btree (slug COLLATE pg_catalog."default" ASC NULLS LAST) TABLESPACE pg_default;
-- Index: collection_translation_baseId_idx
-- DROP INDEX IF EXISTS public.collection_translation_baseId_idx;
CREATE INDEX IF NOT EXISTS collection_translation_baseId_idx ON public.collection_translation USING btree ("baseId" ASC NULLS LAST) TABLESPACE pg_default;
-- Table: public.collection_closure
-- DROP TABLE IF EXISTS public.collection_closure
CREATE TABLE IF NOT EXISTS public.collection_closure (
    id_ancestor integer NOT NULL,
    id_descendant integer NOT NULL,
    PRIMARY KEY (id_ancestor, id_descendant),
    FOREIGN KEY (id_descendant) REFERENCES public.collection (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE CASCADE,
    FOREIGN KEY (id_ancestor) REFERENCES public.collection (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE CASCADE
) TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.collection_closure OWNER to postgres;
-- Index: collection_closure_desc
-- DROP INDEX IF EXISTS collection_closure_desc
CREATE INDEX IF NOT EXISTS collection_closure_desc ON public.collection_closure USING btree (id_descendant ASC NULLS LAST) TABLESPACE pg_default;
-- Index: collection_closure_asc
-- DROP INDEX IF EXISTS public.collection_closure_asc;
CREATE INDEX IF NOT EXISTS collection_closure_asc ON public.collection_closure USING btree (id_ancestor ASC NULLS LAST) TABLESPACE pg_default;
-- Table: public.product
-- DROP TABLE IF EXISTS public.product;
CREATE TABLE IF NOT EXISTS public.product (
    "createdAt" timestamp without time zone NOT NULL DEFAULT now(),
    "updatedAt" timestamp without time zone NOT NULL DEFAULT now(),
    "deletedAt" timestamp without time zone,
    enabled boolean NOT NULL DEFAULT true,
    id serial,
    "featuredAssetId" integer,
    PRIMARY KEY (id),
    FOREIGN KEY ("featuredAssetId") REFERENCES public.asset (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE
    SET NULL
) TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.product OWNER to postgres;
-- Index: product_featuredAssetid
-- DROP INDEX IF EXISTS product_featuredAssetid
CREATE INDEX IF NOT EXISTS product_featuredAssetid ON public.product USING btree ("featuredAssetId" ASC NULLS LAST) TABLESPACE pg_default;
-- Table: public.product_translation
-- DROP TABLE IF EXISTS public.product_translation;
CREATE TABLE IF NOT EXISTS public.product_translation (
    "createdAt" timestamp without time zone NOT NULL DEFAULT now(),
    "updatedAt" timestamp without time zone NOT NULL DEFAULT now(),
    "languageCode" character varying COLLATE pg_catalog."default" NOT NULL,
    name character varying COLLATE pg_catalog."default" NOT NULL,
    slug character varying COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default" NOT NULL,
    id serial,
    "baseId" integer,
    PRIMARY KEY (id),
    FOREIGN KEY ("baseId") REFERENCES public.product (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION
) TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.product_translation OWNER to postgres;
-- Index: public.product_translation_baseid
-- DROP INDEX IF EXISTS public.product_translation_baseid
CREATE INDEX IF NOT EXISTS product_translation_baseid ON public.product_translation USING btree ("baseId" ASC NULLS LAST) TABLESPACE pg_default;
-- Index: IDX_f4a2ec16ba86d277b6faa0b67b
-- DROP INDEX IF EXISTS public."IDX_f4a2ec16ba86d277b6faa0b67b";
CREATE INDEX IF NOT EXISTS "IDX_f4a2ec16ba86d277b6faa0b67b" ON public.product_translation USING btree (slug COLLATE pg_catalog."default" ASC NULLS LAST) TABLESPACE pg_default;
-- Table: public.product_asset
-- DROP TABLE IF EXISTS public.product_asset;
CREATE TABLE IF NOT EXISTS public.product_asset (
    "createdAt" timestamp without time zone NOT NULL DEFAULT now(),
    "updatedAt" timestamp without time zone NOT NULL DEFAULT now(),
    "assetId" integer NOT NULL,
    "position" integer NOT NULL,
    "productId" integer NOT NULL,
    id serial,
    PRIMARY KEY (id),
    FOREIGN KEY ("productId") REFERENCES public.product (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE CASCADE,
    FOREIGN KEY ("assetId") REFERENCES public.asset (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE CASCADE
) TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.product_asset OWNER to postgres;
-- Index: public.product_asset_productId
-- DROP INDEX IF EXISTS public.product_asset_productId
CREATE INDEX IF NOT EXISTS product_asset_productId ON public.product_asset USING btree ("productId" ASC NULLS LAST) TABLESPACE pg_default;
-- Index: public.product_asset_assetid
-- DROP INDEX IF EXISTS public.product_asset_assetid
CREATE INDEX IF NOT EXISTS product_asset_assetid ON public.product_asset USING btree ("assetId" ASC NULLS LAST) TABLESPACE pg_default;
-- Table: public.product_option_group
-- DROP TABLE IF EXISTS public.product_option_group;
CREATE TABLE IF NOT EXISTS public.product_option_group (
    "createdAt" timestamp without time zone NOT NULL DEFAULT now(),
    "updatedAt" timestamp without time zone NOT NULL DEFAULT now(),
    "deletedAt" timestamp without time zone,
    code character varying COLLATE pg_catalog."default" NOT NULL,
    id serial,
    "productId" integer,
    PRIMARY KEY (id),
    FOREIGN KEY ("productId") REFERENCES public.product (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION
) TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.product_option_group OWNER to postgres;
-- Index: public.product_option_group_productid
-- DROP INDEX IF EXISTS public.product_option_group_productid
CREATE INDEX IF NOT EXISTS product_option_group_productid ON public.product_option_group USING btree ("productId" ASC NULLS LAST) TABLESPACE pg_default;
-- Table: public.product_option
-- DROP TABLE IF EXISTS public.product_option;
CREATE TABLE IF NOT EXISTS public.product_option (
    "createdAt" timestamp without time zone NOT NULL DEFAULT now(),
    "updatedAt" timestamp without time zone NOT NULL DEFAULT now(),
    "deletedAt" timestamp without time zone,
    code character varying COLLATE pg_catalog."default" NOT NULL,
    id serial,
    "groupId" integer NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY ("groupId") REFERENCES public.product_option_group (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION
) TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.product_option OWNER to postgres;
-- Index: public.product_option_groupid
-- DROP INDEX IF EXISTS public.product_option_groupid
CREATE INDEX IF NOT EXISTS product_option_groupid ON public.product_option USING btree ("groupId" ASC NULLS LAST) TABLESPACE pg_default;
-- Table: public.product_option_translation
-- DROP TABLE IF EXISTS public.product_option_translation;
CREATE TABLE IF NOT EXISTS public.product_option_translation (
    "createdAt" timestamp without time zone NOT NULL DEFAULT now(),
    "updatedAt" timestamp without time zone NOT NULL DEFAULT now(),
    "languageCode" character varying COLLATE pg_catalog."default" NOT NULL,
    name character varying COLLATE pg_catalog."default" NOT NULL,
    id serial,
    "baseId" integer,
    PRIMARY KEY (id),
    FOREIGN KEY ("baseId") REFERENCES public.product_option (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE CASCADE
) TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.product_option_translation OWNER to postgres;
-- Index: public.product_option_translation_baseId
-- DROP INDEX IF EXISTS public.product_option_translation_baseId
CREATE INDEX IF NOT EXISTS product_option_translation_baseId ON public.product_option_translation USING btree ("baseId" ASC NULLS LAST) TABLESPACE pg_default;
-- Table: public.product_option_group_translation
-- DROP TABLE IF EXISTS public.product_option_group_translation;
CREATE TABLE IF NOT EXISTS public.product_option_group_translation (
    "createdAt" timestamp without time zone NOT NULL DEFAULT now(),
    "updatedAt" timestamp without time zone NOT NULL DEFAULT now(),
    "languageCode" character varying COLLATE pg_catalog."default" NOT NULL,
    name character varying COLLATE pg_catalog."default" NOT NULL,
    id serial,
    "baseId" integer,
    PRIMARY KEY (id),
    FOREIGN KEY ("baseId") REFERENCES public.product_option_group (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE CASCADE
) TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.product_option_group_translation OWNER to postgres;
-- Index: public.product_option_group_translation_baseId
-- DROP INDEX IF EXISTS public.product_option_group_translation_baseId
CREATE INDEX IF NOT EXISTS product_option_group_translation_baseId ON public.product_option_group_translation USING btree ("baseId" ASC NULLS LAST) TABLESPACE pg_default;
-- Table: public.product_variant
-- DROP TABLE IF EXISTS public.product_variant;
CREATE TABLE IF NOT EXISTS public.product_variant (
    "createdAt" timestamp without time zone NOT NULL DEFAULT now(),
    "updatedAt" timestamp without time zone NOT NULL DEFAULT now(),
    "deletedAt" timestamp without time zone,
    enabled boolean NOT NULL DEFAULT true,
    sku character varying COLLATE pg_catalog."default" NOT NULL,
    "outOfStockThreshold" integer NOT NULL DEFAULT 0,
    "useGlobalOutOfStockThreshold" boolean NOT NULL DEFAULT true,
    "trackInventory" character varying COLLATE pg_catalog."default" NOT NULL DEFAULT 'INHERIT'::character varying,
    id serial,
    "productId" integer,
    "featuredAssetId" integer,
    PRIMARY KEY (id),
    FOREIGN KEY ("featuredAssetId") REFERENCES public.asset (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE
    SET NULL,
        FOREIGN KEY ("productId") REFERENCES public.product (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION
) TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.product_variant OWNER to postgres;
-- Index: public.product_variant_featuredAssetId
-- DROP INDEX IF EXISTS public.product_variant_featuredAssetId
CREATE INDEX IF NOT EXISTS product_variant_featuredAssetId ON public.product_variant USING btree ("featuredAssetId" ASC NULLS LAST) TABLESPACE pg_default;
-- Index: public.product_variant_productid
-- DROP INDEX IF EXISTS public.product_variant_productid
CREATE INDEX IF NOT EXISTS product_variant_productid ON public.product_variant USING btree ("productId" ASC NULLS LAST) TABLESPACE pg_default;
-- Table: public.facet
-- DROP TABLE IF EXISTS public.facet;
CREATE TABLE IF NOT EXISTS public.facet (
    "createdAt" timestamp without time zone NOT NULL DEFAULT now(),
    "updatedAt" timestamp without time zone NOT NULL DEFAULT now(),
    "isPrivate" boolean NOT NULL DEFAULT false,
    code character varying COLLATE pg_catalog."default" NOT NULL,
    id serial,
    PRIMARY KEY (id),
    UNIQUE (code)
) TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.facet OWNER to postgres;
-- Table: public.facet_value
-- DROP TABLE IF EXISTS public.facet_value;
CREATE TABLE IF NOT EXISTS public.facet_value (
    "createdAt" timestamp without time zone NOT NULL DEFAULT now(),
    "updatedAt" timestamp without time zone NOT NULL DEFAULT now(),
    code character varying COLLATE pg_catalog."default" NOT NULL,
    id serial,
    "facetId" integer NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY ("facetId") REFERENCES public.facet (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE CASCADE
) TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.facet_value OWNER to postgres;
-- Index: public.facet_value_facetid
-- DROP INDEX IF EXISTS public.facet_value_facetid
CREATE INDEX IF NOT EXISTS facet_value_facetid ON public.facet_value USING btree ("facetId" ASC NULLS LAST) TABLESPACE pg_default;
-- Table: public.product_variant_asset
-- DROP TABLE IF EXISTS public.product_variant_asset;
CREATE TABLE IF NOT EXISTS public.product_variant_asset (
    "createdAt" timestamp without time zone NOT NULL DEFAULT now(),
    "updatedAt" timestamp without time zone NOT NULL DEFAULT now(),
    "assetId" integer NOT NULL,
    "position" integer NOT NULL,
    "productVariantId" integer NOT NULL,
    id serial,
    PRIMARY KEY (id),
    FOREIGN KEY ("assetId") REFERENCES public.asset (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE CASCADE,
    FOREIGN KEY ("productVariantId") REFERENCES public.product_variant (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE CASCADE
) TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.product_variant_asset OWNER to postgres;
-- Index: public.product_variant_asset_id
-- DROP INDEX IF EXISTS public.product_variant_asset_id
CREATE INDEX IF NOT EXISTS product_variant_asset_id ON public.product_variant_asset USING btree ("assetId" ASC NULLS LAST) TABLESPACE pg_default;
-- Index: public.product_variant_asset_prod_variantid
-- DROP INDEX IF EXISTS public.product_variant_asset_prod_variantid
CREATE INDEX IF NOT EXISTS product_variant_asset_prod_variantid ON public.product_variant_asset USING btree ("productVariantId" ASC NULLS LAST) TABLESPACE pg_default;
-- Table: public.product_variant_facet_values_facet_value
-- DROP TABLE IF EXISTS public.product_variant_facet_values_facet_value;
CREATE TABLE IF NOT EXISTS public.product_variant_facet_values_facet_value (
    "productVariantId" integer NOT NULL,
    "facetValueId" integer NOT NULL,
    PRIMARY KEY ("productVariantId", "facetValueId"),
    FOREIGN KEY ("facetValueId") REFERENCES public.facet_value (id) MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY ("productVariantId") REFERENCES public.product_variant (id) MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE
) TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.product_variant_facet_values_facet_value OWNER to postgres;
-- Index: product_variant_facet_values_facet_value_facetValueId
-- DROP INDEX IF EXISTS product_variant_facet_values_facet_value_facetValueId
CREATE INDEX IF NOT EXISTS product_variant_facet_values_facet_value_facetValueId ON public.product_variant_facet_values_facet_value USING btree ("facetValueId" ASC NULLS LAST) TABLESPACE pg_default;
-- Index: public.product_variant_facet_values_facet_value_productVariantId
-- DROP INDEX IF EXISTS public.product_variant_facet_values_facet_value_productVariantId
CREATE INDEX IF NOT EXISTS product_variant_facet_values_facet_value_productVariantId ON public.product_variant_facet_values_facet_value USING btree ("productVariantId" ASC NULLS LAST) TABLESPACE pg_default;
-- Table: public.product_variant_options_product_option
-- DROP TABLE IF EXISTS public.product_variant_options_product_option;
CREATE TABLE IF NOT EXISTS public.product_variant_options_product_option (
    "productVariantId" integer NOT NULL,
    "productOptionId" integer NOT NULL,
    PRIMARY KEY ("productVariantId", "productOptionId"),
    FOREIGN KEY ("productVariantId") REFERENCES public.product_variant (id) MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY ("productOptionId") REFERENCES public.product_option (id) MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE
) TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.product_variant_options_product_option OWNER to postgres;
-- Index: public.product_variant_options_product_option_productVariantId
-- DROP INDEX IF EXISTS public.product_variant_options_product_option_productVariantId
CREATE INDEX IF NOT EXISTS product_variant_options_product_option_productVariantId ON public.product_variant_options_product_option USING btree ("productVariantId" ASC NULLS LAST) TABLESPACE pg_default;
-- Index: public.product_variant_options_product_option_productOptionId
-- DROP INDEX IF EXISTS public.product_variant_options_product_option_productOptionId
CREATE INDEX IF NOT EXISTS product_variant_options_product_option ON public.product_variant_options_product_option USING btree ("productOptionId" ASC NULLS LAST) TABLESPACE pg_default;
-- Table: public.product_variant_price
-- DROP TABLE IF EXISTS public.product_variant_price;
CREATE TABLE IF NOT EXISTS public.product_variant_price (
    "createdAt" timestamp without time zone NOT NULL DEFAULT now(),
    "updatedAt" timestamp without time zone NOT NULL DEFAULT now(),
    "currencyCode" character varying COLLATE pg_catalog."default" NOT NULL,
    id serial,
    "channelId" integer,
    price integer NOT NULL,
    "variantId" integer,
    PRIMARY KEY (id),
    FOREIGN KEY ("variantId") REFERENCES public.product_variant (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE CASCADE
) TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.product_variant_price OWNER to postgres;
-- Index: public.product_variant_price_variantId
-- DROP INDEX IF EXISTS public.product_variant_price_variantId
CREATE INDEX IF NOT EXISTS product_variant_price_variantId ON public.product_variant_price USING btree ("variantId" ASC NULLS LAST) TABLESPACE pg_default;
-- Table: public.product_variant_translation
-- DROP TABLE IF EXISTS public.product_variant_translation;
CREATE TABLE IF NOT EXISTS public.product_variant_translation (
    "createdAt" timestamp without time zone NOT NULL DEFAULT now(),
    "updatedAt" timestamp without time zone NOT NULL DEFAULT now(),
    "languageCode" character varying COLLATE pg_catalog."default" NOT NULL,
    name character varying COLLATE pg_catalog."default" NOT NULL,
    id serial,
    "baseId" integer,
    PRIMARY KEY (id),
    FOREIGN KEY ("baseId") REFERENCES public.product_variant (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE CASCADE
) TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.product_variant_translation OWNER to postgres;
-- Index: public.product_variant_translation_baseid
-- DROP INDEX IF EXISTS public.product_variant_translation_baseid
CREATE INDEX IF NOT EXISTS product_variant_translation_baseid ON public.product_variant_translation USING btree ("baseId" ASC NULLS LAST) TABLESPACE pg_default;
-- Table: public.collection_product_variants_product_variant
-- DROP TABLE IF EXISTS public.collection_product_variants_product_variant;
CREATE TABLE IF NOT EXISTS public.collection_product_variants_product_variant (
    "collectionId" integer NOT NULL,
    "productVariantId" integer NOT NULL,
    PRIMARY KEY ("collectionId", "productVariantId"),
    FOREIGN KEY ("collectionId") REFERENCES public.collection (id) MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY ("productVariantId") REFERENCES public.product_variant (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION
) TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.collection_product_variants_product_variant OWNER to postgres;
-- Index: collection_product_variants_product_variant_collectionId
-- DROP INDEX IF EXISTS public.collection_product_variants_product_variant_collectionId
CREATE INDEX IF NOT EXISTS collection_product_variants_product_variant_collectionId ON public.collection_product_variants_product_variant USING btree ("collectionId" ASC NULLS LAST) TABLESPACE pg_default;
-- Index: collection_product_variants_product_variant_productVariantId
-- DROP INDEX IF EXISTS public."collection_product_variants_product_variant_productVariantId";
CREATE INDEX IF NOT EXISTS collection_product_variants_product_variant_productVariantId ON public.collection_product_variants_product_variant USING btree ("productVariantId" ASC NULLS LAST) TABLESPACE pg_default;
-- Table: public.facet_translation
-- DROP TABLE IF EXISTS public.facet_translation;
CREATE TABLE IF NOT EXISTS public.facet_translation (
    "createdAt" timestamp without time zone NOT NULL DEFAULT now(),
    "updatedAt" timestamp without time zone NOT NULL DEFAULT now(),
    "languageCode" character varying COLLATE pg_catalog."default" NOT NULL,
    name character varying COLLATE pg_catalog."default" NOT NULL,
    id serial,
    "baseId" integer,
    PRIMARY KEY (id),
    FOREIGN KEY ("baseId") REFERENCES public.facet (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE CASCADE
) TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.facet_translation OWNER to postgres;
-- Index: public.facet_translation_baseid
-- DROP INDEX IF EXISTS public.facet_translation_baseid
CREATE INDEX IF NOT EXISTS facet_translation_baseid ON public.facet_translation USING btree ("baseId" ASC NULLS LAST) TABLESPACE pg_default;
-- Table: public.facet_value_translation
-- DROP TABLE IF EXISTS public.facet_value_translation;
CREATE TABLE IF NOT EXISTS public.facet_value_translation (
    "createdAt" timestamp without time zone NOT NULL DEFAULT now(),
    "updatedAt" timestamp without time zone NOT NULL DEFAULT now(),
    "languageCode" character varying COLLATE pg_catalog."default" NOT NULL,
    name character varying COLLATE pg_catalog."default" NOT NULL,
    id serial,
    "baseId" integer,
    PRIMARY KEY (id),
    FOREIGN KEY ("baseId") REFERENCES public.facet_value (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE CASCADE
) TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.facet_value_translation OWNER to postgres;
-- Index: public.facet_value_translation_baseid
-- DROP INDEX IF EXISTS public.facet_value_translation_baseid
CREATE INDEX IF NOT EXISTS facet_value_translation_baseid ON public.facet_value_translation USING btree ("baseId" ASC NULLS LAST) TABLESPACE pg_default;
-- Table: public.global_settings
-- DROP TABLE IF EXISTS public.global_settings;
CREATE TABLE IF NOT EXISTS public.global_settings (
    "createdAt" timestamp without time zone NOT NULL DEFAULT now(),
    "updatedAt" timestamp without time zone NOT NULL DEFAULT now(),
    "availableLanguages" text COLLATE pg_catalog."default" NOT NULL,
    "trackInventory" boolean NOT NULL DEFAULT true,
    "outOfStockThreshold" integer NOT NULL DEFAULT 0,
    id serial,
    PRIMARY KEY (id)
) TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.global_settings OWNER to postgres;