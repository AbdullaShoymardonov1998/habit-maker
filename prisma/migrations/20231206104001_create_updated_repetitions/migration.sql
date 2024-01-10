/*
  Warnings:

  - You are about to drop the column `weekday` on the `repetitions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "habits" ALTER COLUMN "color" DROP DEFAULT;

-- AlterTable
ALTER TABLE "repetitions" DROP COLUMN "weekday",
ADD COLUMN     "notify_time" TEXT NOT NULL DEFAULT '12:00',
ADD COLUMN     "number_of_days" INTEGER DEFAULT 0,
ADD COLUMN     "show_notification" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "weekdays" JSONB;

-- DropEnum
DROP TYPE "Weekdays";
