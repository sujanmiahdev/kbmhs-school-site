-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "full_name" TEXT NOT NULL,
    "father_name" TEXT NOT NULL,
    "mother_name" TEXT NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "student_id" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "class" TEXT NOT NULL,
    "group" TEXT NOT NULL,
    "passing_year" INTEGER NOT NULL,
    "blood_group" TEXT,
    "password" TEXT NOT NULL,
    "profile_picture" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_student_id_key" ON "Student"("student_id");
