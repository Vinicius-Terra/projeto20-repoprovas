-- CreateTable
CREATE TABLE "tests" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "pdfurl" TEXT NOT NULL,

    CONSTRAINT "tests_pkey" PRIMARY KEY ("id")
);
