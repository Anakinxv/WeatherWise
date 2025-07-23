/*
  Warnings:

  - You are about to drop the column `quantity` on the `SearchHistory` table. All the data in the column will be lost.
  - Added the required column `thatMomentTemperature` to the `SearchHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thatMomentWeather` to the `SearchHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `city` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SearchHistory" DROP COLUMN "quantity",
ADD COLUMN     "thatMomentTemperature" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "thatMomentWeather" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "profilePictureUrl" TEXT;

-- AlterTable
ALTER TABLE "city" ADD COLUMN     "state" TEXT NOT NULL;
