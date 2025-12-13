/*
  Warnings:

  - You are about to drop the column `password` on the `Doctor` table. All the data in the column will be lost.
  - Added the required column `clerkId` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `Illness` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Doctor" DROP COLUMN "password",
ADD COLUMN     "clerkId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Illness" ADD COLUMN     "category" TEXT NOT NULL;
