/*
  Warnings:

  - The required column `id` was added to the `grades` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropIndex
DROP INDEX "grades_student_id_subject_id_key";

-- AlterTable
ALTER TABLE "grades" ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "grades_pkey" PRIMARY KEY ("id");
