/*
  Warnings:

  - You are about to drop the column `createdAt` on the `activities` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `habits` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "activities" DROP COLUMN "createdAt",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "habits" DROP COLUMN "description";
