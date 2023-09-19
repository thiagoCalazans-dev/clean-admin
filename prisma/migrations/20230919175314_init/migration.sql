/*
  Warnings:

  - You are about to drop the column `contractId` on the `amendments` table. All the data in the column will be lost.
  - You are about to drop the column `dueDate` on the `amendments` table. All the data in the column will be lost.
  - You are about to drop the column `subscriptionDate` on the `amendments` table. All the data in the column will be lost.
  - You are about to drop the column `biddingTypeId` on the `contracts` table. All the data in the column will be lost.
  - You are about to drop the column `billingDeadline` on the `contracts` table. All the data in the column will be lost.
  - You are about to drop the column `dueDate` on the `contracts` table. All the data in the column will be lost.
  - You are about to drop the column `endContract` on the `contracts` table. All the data in the column will be lost.
  - You are about to drop the column `processNumber` on the `contracts` table. All the data in the column will be lost.
  - You are about to drop the column `subscriptionDate` on the `contracts` table. All the data in the column will be lost.
  - You are about to drop the column `supplierId` on the `contracts` table. All the data in the column will be lost.
  - You are about to drop the column `zipCode` on the `suppliers` table. All the data in the column will be lost.
  - Added the required column `contract_id` to the `amendments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `due_date` to the `amendments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subscription_date` to the `amendments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bidding_type_id` to the `contracts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `billing_deadline` to the `contracts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `due_date` to the `contracts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end_contract` to the `contracts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `process_number` to the `contracts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subscription_date` to the `contracts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `supplier_id` to the `contracts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zipcode` to the `suppliers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "amendments" DROP CONSTRAINT "amendments_contractId_fkey";

-- DropForeignKey
ALTER TABLE "contracts" DROP CONSTRAINT "contracts_biddingTypeId_fkey";

-- DropForeignKey
ALTER TABLE "contracts" DROP CONSTRAINT "contracts_supplierId_fkey";

-- DropIndex
DROP INDEX "amendments_contractId_idx";

-- DropIndex
DROP INDEX "unique_contract_amendment";

-- DropIndex
DROP INDEX "contracts_biddingTypeId_idx";

-- DropIndex
DROP INDEX "contracts_supplierId_idx";

-- DropIndex
DROP INDEX "unique_contract";

-- AlterTable
ALTER TABLE "amendments" DROP COLUMN "contractId",
DROP COLUMN "dueDate",
DROP COLUMN "subscriptionDate",
ADD COLUMN     "contract_id" TEXT NOT NULL,
ADD COLUMN     "due_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "subscription_date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "contracts" DROP COLUMN "biddingTypeId",
DROP COLUMN "billingDeadline",
DROP COLUMN "dueDate",
DROP COLUMN "endContract",
DROP COLUMN "processNumber",
DROP COLUMN "subscriptionDate",
DROP COLUMN "supplierId",
ADD COLUMN     "bidding_type_id" TEXT NOT NULL,
ADD COLUMN     "billing_deadline" TEXT NOT NULL,
ADD COLUMN     "due_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "end_contract" BOOLEAN NOT NULL,
ADD COLUMN     "process_number" TEXT NOT NULL,
ADD COLUMN     "subscription_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "supplier_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "suppliers" DROP COLUMN "zipCode",
ADD COLUMN     "zipcode" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "unique_contract_amendment" ON "amendments"("number", "contract_id");

-- CreateIndex
CREATE INDEX "amendments_contract_id_idx" ON "amendments"("contract_id");

-- CreateIndex
CREATE INDEX "unique_contract" ON "contracts"("number", "process_number", "supplier_id");

-- CreateIndex
CREATE INDEX "contracts_bidding_type_id_idx" ON "contracts"("bidding_type_id");

-- CreateIndex
CREATE INDEX "contracts_supplier_id_idx" ON "contracts"("supplier_id");

-- AddForeignKey
ALTER TABLE "contracts" ADD CONSTRAINT "contracts_bidding_type_id_fkey" FOREIGN KEY ("bidding_type_id") REFERENCES "bidding_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contracts" ADD CONSTRAINT "contracts_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "suppliers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "amendments" ADD CONSTRAINT "amendments_contract_id_fkey" FOREIGN KEY ("contract_id") REFERENCES "contracts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
