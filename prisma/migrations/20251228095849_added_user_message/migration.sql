-- CreateTable
CREATE TABLE "UserMessage" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "illnessId" TEXT NOT NULL,
    "chat" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,

    CONSTRAINT "UserMessage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserMessage" ADD CONSTRAINT "UserMessage_illnessId_fkey" FOREIGN KEY ("illnessId") REFERENCES "Illness"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMessage" ADD CONSTRAINT "UserMessage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMessage" ADD CONSTRAINT "UserMessage_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
