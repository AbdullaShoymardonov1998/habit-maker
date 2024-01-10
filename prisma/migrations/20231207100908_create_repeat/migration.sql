/*
  Warnings:

  - A unique constraint covering the columns `[habit_id]` on the table `repetitions` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "repetitions" ALTER COLUMN "weekdays" SET DEFAULT '[]';

-- CreateIndex
CREATE UNIQUE INDEX "repetitions_habit_id_key" ON "repetitions"("habit_id");
