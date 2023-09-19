/*
  Warnings:

  - You are about to drop the column `contract_id` on the `amendments` table. All the data in the column will be lost.
  - You are about to drop the column `due_date` on the `amendments` table. All the data in the column will be lost.
  - You are about to drop the column `subscription_date` on the `amendments` table. All the data in the column will be lost.
  - You are about to drop the column `bidding_type_id` on the `contracts` table. All the data in the column will be lost.
  - You are about to drop the column `billing_deadline` on the `contracts` table. All the data in the column will be lost.
  - You are about to drop the column `due_date` on the `contracts` table. All the data in the column will be lost.
  - You are about to drop the column `end_contract` on the `contracts` table. All the data in the column will be lost.
  - You are about to drop the column `process_number` on the `contracts` table. All the data in the column will be lost.
  - You are about to drop the column `subscription_date` on the `contracts` table. All the data in the column will be lost.
  - You are about to drop the column `supplier_id` on the `contracts` table. All the data in the column will be lost.
  - Added the required column `contractId` to the `amendments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dueDate` to the `amendments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subscriptionDate` to the `amendments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `biddingTypeId` to the `contracts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `billingDeadline` to the `contracts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dueDate` to the `contracts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endContract` to the `contracts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `processNumber` to the `contracts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subscriptionDate` to the `contracts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `supplierId` to the `contracts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "amendments" DROP CONSTRAINT "amendments_contract_id_fkey";

-- DropForeignKey
ALTER TABLE "contracts" DROP CONSTRAINT "contracts_bidding_type_id_fkey";

-- DropForeignKey
ALTER TABLE "contracts" DROP CONSTRAINT "contracts_supplier_id_fkey";

-- DropIndex
DROP INDEX "amendments_contract_id_idx";

-- DropIndex
DROP INDEX "unique_contract_amendment";

-- DropIndex
DROP INDEX "contracts_bidding_type_id_idx";

-- DropIndex
DROP INDEX "contracts_supplier_id_idx";

-- DropIndex
DROP INDEX "unique_contract";

-- AlterTable
ALTER TABLE "amendments" DROP COLUMN "contract_id",
DROP COLUMN "due_date",
DROP COLUMN "subscription_date",
ADD COLUMN     "contractId" TEXT NOT NULL,
ADD COLUMN     "dueDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "subscriptionDate" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "contracts" DROP COLUMN "bidding_type_id",
DROP COLUMN "billing_deadline",
DROP COLUMN "due_date",
DROP COLUMN "end_contract",
DROP COLUMN "process_number",
DROP COLUMN "subscription_date",
DROP COLUMN "supplier_id",
ADD COLUMN     "biddingTypeId" TEXT NOT NULL,
ADD COLUMN     "billingDeadline" TEXT NOT NULL,
ADD COLUMN     "dueDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "endContract" BOOLEAN NOT NULL,
ADD COLUMN     "processNumber" TEXT NOT NULL,
ADD COLUMN     "subscriptionDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "supplierId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "unique_contract_amendment" ON "amendments"("number", "contractId");

-- CreateIndex
CREATE INDEX "amendments_contractId_idx" ON "amendments"("contractId");

-- CreateIndex
CREATE INDEX "unique_contract" ON "contracts"("number", "processNumber", "supplierId");

-- CreateIndex
CREATE INDEX "contracts_biddingTypeId_idx" ON "contracts"("biddingTypeId");

-- CreateIndex
CREATE INDEX "contracts_supplierId_idx" ON "contracts"("supplierId");

-- AddForeignKey
ALTER TABLE "contracts" ADD CONSTRAINT "contracts_biddingTypeId_fkey" FOREIGN KEY ("biddingTypeId") REFERENCES "bidding_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contracts" ADD CONSTRAINT "contracts_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "amendments" ADD CONSTRAINT "amendments_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "contracts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
