/*
  Warnings:

  - You are about to drop the column `dueDate` on the `contracts` table. All the data in the column will be lost.
  - You are about to drop the column `subscriptionDate` on the `contracts` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `contracts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "contracts" DROP COLUMN "dueDate",
DROP COLUMN "subscriptionDate",
DROP COLUMN "value";
