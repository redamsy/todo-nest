-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('A', 'B', 'C');

-- CreateTable
CREATE TABLE "UserProfile" (
    "userId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "UserPassword" (
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "userId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ToDo" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" VARCHAR(2000) NOT NULL,
    "priority" "Priority" NOT NULL DEFAULT 'A',
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "date" DATE NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "ToDo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_email_key" ON "UserProfile"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserPassword_email_key" ON "UserPassword"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserPassword_userId_key" ON "UserPassword"("userId");

-- AddForeignKey
ALTER TABLE "UserPassword" ADD CONSTRAINT "UserPassword_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserProfile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToDo" ADD CONSTRAINT "ToDo_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "UserProfile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
