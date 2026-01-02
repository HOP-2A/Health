/*
  Warnings:

  - Made the column `notes` on table `DoctorReview` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "DoctorReview" ALTER COLUMN "notes" SET NOT NULL;
