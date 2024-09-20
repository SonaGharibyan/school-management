/*
  Warnings:

  - You are about to drop the `_pupilsubjects` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `grade` to the `Subject` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_pupilsubjects` DROP FOREIGN KEY `_PupilSubjects_A_fkey`;

-- DropForeignKey
ALTER TABLE `_pupilsubjects` DROP FOREIGN KEY `_PupilSubjects_B_fkey`;

-- DropForeignKey
ALTER TABLE `subject` DROP FOREIGN KEY `Subject_teacherId_fkey`;

-- AlterTable
ALTER TABLE `subject` ADD COLUMN `grade` INTEGER NOT NULL;

-- DropTable
DROP TABLE `_pupilsubjects`;

-- AddForeignKey
ALTER TABLE `Subject` ADD CONSTRAINT `Subject_teacherId_fkey` FOREIGN KEY (`teacherId`) REFERENCES `Teacher`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
