/*
  Warnings:

  - You are about to drop the column `isSelected` on the `weekdays` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "weekdays" DROP COLUMN "isSelected",
ADD COLUMN     "is_selected" BOOLEAN NOT NULL DEFAULT false;
