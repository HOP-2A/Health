/*
  Warnings:

  - Made the column `category` on table `Medicine` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Medicine" ALTER COLUMN "category" SET NOT NULL,
ALTER COLUMN "category" DROP DEFAULT;
