-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "client_name" TEXT,
    "address" TEXT,
    "total_budget" DOUBLE PRECISION,
    "exchange_rate" DOUBLE PRECISION,
    "start_date" TEXT,
    "end_date" TEXT,
    "notes" TEXT,
    "share_token" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Phase" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "status" TEXT,
    "start" TEXT,
    "end" TEXT,
    "progress" INTEGER,
    "notes" TEXT,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "Phase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "title_sr" TEXT,
    "title_ru" TEXT,
    "title_zh" TEXT,
    "phaseId" TEXT,
    "workerId" TEXT,
    "lead_time" INTEGER,
    "cost" DOUBLE PRECISION,
    "advance_amount" DOUBLE PRECISION,
    "advance_paid" BOOLEAN,
    "notes" TEXT,
    "status" TEXT,
    "done" BOOLEAN,
    "priority" TEXT,
    "start_date" TEXT,
    "end_date" TEXT,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Worker" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "trade" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "rate" TEXT,
    "rating" INTEGER,
    "notes" TEXT,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "Worker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Expense" (
    "id" TEXT NOT NULL,
    "category" TEXT,
    "desc" TEXT,
    "amount" DOUBLE PRECISION,
    "date" TEXT,
    "paid" BOOLEAN,
    "advance_amount" DOUBLE PRECISION,
    "advance_paid" BOOLEAN,
    "recipient" TEXT,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Material" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "phaseId" TEXT,
    "quantity" DOUBLE PRECISION,
    "unit" TEXT,
    "price" DOUBLE PRECISION,
    "store" TEXT,
    "status" TEXT,
    "order_by_date" TEXT,
    "delivered_date" TEXT,
    "notes" TEXT,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "Material_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "desc" TEXT,
    "amount" DOUBLE PRECISION,
    "percentage" DOUBLE PRECISION,
    "due_date" TEXT,
    "paid_date" TEXT,
    "paid" BOOLEAN,
    "advance_amount" DOUBLE PRECISION,
    "advance_paid" BOOLEAN,
    "phaseId" TEXT,
    "workerId" TEXT,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Log" (
    "id" TEXT NOT NULL,
    "text" TEXT,
    "image" TEXT,
    "date" TEXT,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PunchList" (
    "id" TEXT NOT NULL,
    "text" TEXT,
    "done" BOOLEAN,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "PunchList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Change" (
    "id" TEXT NOT NULL,
    "desc" TEXT,
    "amount" DOUBLE PRECISION,
    "date" TEXT,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "Change_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Phase" ADD CONSTRAINT "Phase_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_phaseId_fkey" FOREIGN KEY ("phaseId") REFERENCES "Phase"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "Worker"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Worker" ADD CONSTRAINT "Worker_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Material" ADD CONSTRAINT "Material_phaseId_fkey" FOREIGN KEY ("phaseId") REFERENCES "Phase"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Material" ADD CONSTRAINT "Material_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_phaseId_fkey" FOREIGN KEY ("phaseId") REFERENCES "Phase"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "Worker"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PunchList" ADD CONSTRAINT "PunchList_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Change" ADD CONSTRAINT "Change_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
