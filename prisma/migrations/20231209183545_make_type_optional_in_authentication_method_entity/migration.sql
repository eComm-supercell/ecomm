-- AlterTable
ALTER TABLE "authentication_method" ALTER COLUMN "identifier" SET DATA TYPE TEXT,
ALTER COLUMN "type" DROP NOT NULL;
