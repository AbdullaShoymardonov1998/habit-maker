/*
  Warnings:

  - You are about to drop the column `weekdays` on the `repetitions` table. All the data in the column will be lost.
  - Made the column `number_of_days` on table `repetitions` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Weekday" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- AlterTable
ALTER TABLE "repetitions" DROP COLUMN "weekdays",
ALTER COLUMN "number_of_days" SET NOT NULL;

-- CreateTable
CREATE TABLE "weekdays" (
    "id" TEXT NOT NULL,
    "weekday" "Weekday" NOT NULL,
    "isSelected" BOOLEAN NOT NULL DEFAULT false,
    "repetition_id" TEXT NOT NULL,

    CONSTRAINT "weekdays_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "weekdays" ADD CONSTRAINT "weekdays_repetition_id_fkey" FOREIGN KEY ("repetition_id") REFERENCES "repetitions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
