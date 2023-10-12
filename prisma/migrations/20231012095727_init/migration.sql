/*
  Warnings:

  - You are about to drop the `AmendmentModules` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AmendmentModules" DROP CONSTRAINT "AmendmentModules_amendmentId_fkey";

-- DropForeignKey
ALTER TABLE "AmendmentModules" DROP CONSTRAINT "AmendmentModules_moduleId_fkey";

-- DropTable
DROP TABLE "AmendmentModules";

-- CreateTable
CREATE TABLE "amendment_modules" (
    "id" TEXT NOT NULL,
    "amendmentId" TEXT NOT NULL,
    "moduleId" TEXT NOT NULL,

    CONSTRAINT "amendment_modules_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "unique_contract_amendment_modules" ON "amendment_modules"("moduleId", "amendmentId");

-- CreateIndex
CREATE INDEX "amendment_modules_amendmentId_idx" ON "amendment_modules"("amendmentId");

-- CreateIndex
CREATE INDEX "amendment_modules_moduleId_idx" ON "amendment_modules"("moduleId");

-- AddForeignKey
ALTER TABLE "amendment_modules" ADD CONSTRAINT "amendment_modules_amendmentId_fkey" FOREIGN KEY ("amendmentId") REFERENCES "amendments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "amendment_modules" ADD CONSTRAINT "amendment_modules_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "modules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
