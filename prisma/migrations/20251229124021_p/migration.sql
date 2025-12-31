-- DropForeignKey
ALTER TABLE "UserMessage" DROP CONSTRAINT "UserMessage_illnessId_fkey";

-- AlterTable
ALTER TABLE "UserMessage" ALTER COLUMN "illnessId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "UserMessage" ADD CONSTRAINT "UserMessage_illnessId_fkey" FOREIGN KEY ("illnessId") REFERENCES "Illness"("id") ON DELETE SET NULL ON UPDATE CASCADE;
