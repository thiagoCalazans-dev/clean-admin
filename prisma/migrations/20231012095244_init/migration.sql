-- CreateTable
CREATE TABLE "AmendmentModules" (
    "id" TEXT NOT NULL,
    "amendmentId" TEXT NOT NULL,
    "moduleId" TEXT NOT NULL,

    CONSTRAINT "AmendmentModules_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "unique_contract_amendment_modules" ON "AmendmentModules"("moduleId", "amendmentId");

-- CreateIndex
CREATE INDEX "AmendmentModules_amendmentId_idx" ON "AmendmentModules"("amendmentId");

-- CreateIndex
CREATE INDEX "AmendmentModules_moduleId_idx" ON "AmendmentModules"("moduleId");

-- AddForeignKey
ALTER TABLE "AmendmentModules" ADD CONSTRAINT "AmendmentModules_amendmentId_fkey" FOREIGN KEY ("amendmentId") REFERENCES "amendments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AmendmentModules" ADD CONSTRAINT "AmendmentModules_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "modules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
