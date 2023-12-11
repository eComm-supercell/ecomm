/*
  Warnings:

  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_profileId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- DropTable
DROP TABLE "Profile";

-- CreateTable
CREATE TABLE "OldProfile" (
    "id" SERIAL NOT NULL,
    "dateOfBirth" TIMESTAMP(3),
    "mobile" TEXT,
    "gender" TEXT,
    "addressId" INTEGER,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "OldProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OldProfile_userId_key" ON "OldProfile"("userId");

-- AddForeignKey
ALTER TABLE "OldProfile" ADD CONSTRAINT "OldProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "OldUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "OldProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
