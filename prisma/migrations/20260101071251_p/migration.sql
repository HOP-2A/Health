-- DropForeignKey
ALTER TABLE "DoctorReview" DROP CONSTRAINT "DoctorReview_illnessId_fkey";

-- AlterTable
ALTER TABLE "DoctorReview" ALTER COLUMN "illnessId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "DoctorReview" ADD CONSTRAINT "DoctorReview_illnessId_fkey" FOREIGN KEY ("illnessId") REFERENCES "Illness"("id") ON DELETE SET NULL ON UPDATE CASCADE;
