-- Title: Exodus SQL 
-- Description: SQL inspired by standarized modern eCommmerce systems.
-- Authentication and user management
-- Table: public.user
-- DROP TABLE IF EXISTS public."user";
CREATE TABLE IF NOT EXISTS public."user" (
    "createdAt" timestamp without time zone NOT NULL DEFAULT now(),
    "updatedAt" timestamp without time zone NOT NULL DEFAULT now(),
    "deletedAt" timestamp without time zone,
    identifier character varying COLLATE pg_catalog."default" NOT NULL,
    verified boolean NOT NULL DEFAULT false,
    "lastLogin" timestamp without time zone,
    id serial primary key,
) TABLESPACE pg_default;
-- Table: public.role
-- DROP TABLE IF EXISTS public.role;
CREATE TABLE IF NOT EXISTS public.role (
    "createdAt" timestamp without time zone NOT NULL DEFAULT now(),
    "updatedAt" timestamp without time zone NOT NULL DEFAULT now(),
    code character varying COLLATE pg_catalog."default" NOT NULL,
    description character varying COLLATE pg_catalog."default" NOT NULL,
    permissions text COLLATE pg_catalog."default" NOT NULL,
    id serial primary key,
) TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.role OWNER to postgres;
ALTER TABLE IF EXISTS public."user" OWNER to postgres;
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
-- Index: IDX_4be2f7adf862634f5f803d246b
-- DROP INDEX IF EXISTS public."IDX_4be2f7adf862634f5f803d246b";
CREATE INDEX IF NOT EXISTS "IDX_4be2f7adf862634f5f803d246b" ON public.user_roles_role USING btree ("roleId" ASC NULLS LAST) TABLESPACE pg_default;
-- Index: IDX_5f9286e6c25594c6b88c108db7
-- DROP INDEX IF EXISTS public."IDX_5f9286e6c25594c6b88c108db7";
CREATE INDEX IF NOT EXISTS "IDX_5f9286e6c25594c6b88c108db7" ON public.user_roles_role USING btree ("userId" ASC NULLS LAST) TABLESPACE pg_default;
-- Table: public.customer
-- DROP TABLE IF EXISTS public.customer;
CREATE TABLE IF NOT EXISTS public.customer (
    "createdAt" timestamp without time zone NOT NULL DEFAULT now(),
    "updatedAt" timestamp without time zone NOT NULL DEFAULT now(),
    "deletedAt" timestamp without time zone,
    title character varying COLLATE pg_catalog."default",
    "firstName" character varying COLLATE pg_catalog."default" NOT NULL,
    "lastName" character varying COLLATE pg_catalog."default" NOT NULL,
    "phoneNumber" character varying COLLATE pg_catalog."default",
    "emailAddress" character varying COLLATE pg_catalog."default" NOT NULL,
    id serial,
    "userId" integer,
    CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY (id),
    CONSTRAINT "REL_3f62b42ed23958b120c235f74d" UNIQUE ("userId"),
    CONSTRAINT "FK_3f62b42ed23958b120c235f74df" FOREIGN KEY ("userId") REFERENCES public."user" (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION
) TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.customer OWNER to postgres;
-- Table: public.administrator
-- DROP TABLE IF EXISTS public.administrator;
CREATE TABLE IF NOT EXISTS public.administrator (
    "createdAt" timestamp without time zone NOT NULL DEFAULT now(),
    "updatedAt" timestamp without time zone NOT NULL DEFAULT now(),
    "deletedAt" timestamp without time zone,
    "firstName" character varying COLLATE pg_catalog."default" NOT NULL,
    "lastName" character varying COLLATE pg_catalog."default" NOT NULL,
    "emailAddress" character varying COLLATE pg_catalog."default" NOT NULL,
    id serial,
    "userId" integer,
    CONSTRAINT "PK_ee58e71b3b4008b20ddc7b3092b" PRIMARY KEY (id),
    CONSTRAINT "REL_1966e18ce6a39a82b19204704d" UNIQUE ("userId"),
    CONSTRAINT "UQ_154f5c538b1576ccc277b1ed631" UNIQUE ("emailAddress"),
    CONSTRAINT "FK_1966e18ce6a39a82b19204704d7" FOREIGN KEY ("userId") REFERENCES public."user" (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION
) TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.administrator OWNER to postgres;
-- Table: public.authentication_method
-- DROP TABLE IF EXISTS public.authentication_method;
CREATE TABLE IF NOT EXISTS public.authentication_method (
    "createdAt" timestamp without time zone NOT NULL DEFAULT now(),
    "updatedAt" timestamp without time zone NOT NULL DEFAULT now(),
    identifier character varying COLLATE pg_catalog."default",
    "passwordHash" character varying COLLATE pg_catalog."default",
    "verificationToken" character varying COLLATE pg_catalog."default",
    "passwordResetToken" character varying COLLATE pg_catalog."default",
    "identifierChangeToken" character varying COLLATE pg_catalog."default",
    "pendingIdentifier" character varying COLLATE pg_catalog."default",
    strategy character varying COLLATE pg_catalog."default",
    "externalIdentifier" character varying COLLATE pg_catalog."default",
    metadata text COLLATE pg_catalog."default",
    id serial,
    type character varying COLLATE pg_catalog."default" NOT NULL,
    "userId" integer,
    CONSTRAINT "PK_e204686018c3c60f6164e385081" PRIMARY KEY (id),
    CONSTRAINT "FK_00cbe87bc0d4e36758d61bd31d6" FOREIGN KEY ("userId") REFERENCES public."user" (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION
) TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.authentication_method OWNER to postgres;
-- Index: IDX_00cbe87bc0d4e36758d61bd31d
-- DROP INDEX IF EXISTS public."IDX_00cbe87bc0d4e36758d61bd31d";
CREATE INDEX IF NOT EXISTS "IDX_00cbe87bc0d4e36758d61bd31d" ON public.authentication_method USING btree ("userId" ASC NULLS LAST) TABLESPACE pg_default;
-- Index: IDX_a23445b2c942d8dfcae15b8de2
-- DROP INDEX IF EXISTS public."IDX_a23445b2c942d8dfcae15b8de2";
CREATE INDEX IF NOT EXISTS "IDX_a23445b2c942d8dfcae15b8de2" ON public.authentication_method USING btree (type COLLATE pg_catalog."default" ASC NULLS LAST) TABLESPACE pg_default;
-- Table: public.session
-- DROP TABLE IF EXISTS public.session;
CREATE TABLE IF NOT EXISTS public.session (
    "createdAt" timestamp without time zone NOT NULL DEFAULT now(),
    "updatedAt" timestamp without time zone NOT NULL DEFAULT now(),
    token character varying COLLATE pg_catalog."default" NOT NULL,
    expires timestamp without time zone NOT NULL,
    invalidated boolean NOT NULL,
    "authenticationStrategy" character varying COLLATE pg_catalog."default",
    id serial,
    type character varying COLLATE pg_catalog."default" NOT NULL,
    "userId" integer,
    CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY (id),
    CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53" FOREIGN KEY ("userId") REFERENCES public."user" (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION
) TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.session OWNER to postgres;
-- Index: IDX_232f8e85d7633bd6ddfad42169
-- DROP INDEX IF EXISTS public."IDX_232f8e85d7633bd6ddfad42169";
CREATE UNIQUE INDEX IF NOT EXISTS "IDX_232f8e85d7633bd6ddfad42169" ON public.session USING btree (
    token COLLATE pg_catalog."default" ASC NULLS LAST
) TABLESPACE pg_default;
-- Index: IDX_3d2f174ef04fb312fdebd0ddc5
-- DROP INDEX IF EXISTS public."IDX_3d2f174ef04fb312fdebd0ddc5";
CREATE INDEX IF NOT EXISTS "IDX_3d2f174ef04fb312fdebd0ddc5" ON public.session USING btree ("userId" ASC NULLS LAST) TABLESPACE pg_default;
-- Index: IDX_e5598363000cab9d9116bd5835
-- DROP INDEX IF EXISTS public."IDX_e5598363000cab9d9116bd5835";
CREATE INDEX IF NOT EXISTS "IDX_e5598363000cab9d9116bd5835" ON public.session USING btree (type COLLATE pg_catalog."default" ASC NULLS LAST) TABLESPACE pg_default;
-- 
-- 
-- 
-- 
-- 
-- 
-- 
-- 
- -