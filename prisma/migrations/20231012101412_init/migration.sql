/*
  Warnings:

  - Added the required column `value` to the `amendment_modules` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "amendment_modules" ADD COLUMN     "value" DECIMAL(65,30) NOT NULL;
