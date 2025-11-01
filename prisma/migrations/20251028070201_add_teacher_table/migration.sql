-- CreateTable
CREATE TABLE "Teacher" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "fatherName" TEXT,
    "motherName" TEXT,
    "dob" TIMESTAMP(3) NOT NULL,
    "gender" TEXT NOT NULL,
    "nid" TEXT,
    "maritalStatus" TEXT,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "presentAddress" TEXT,
    "permanentAddress" TEXT,
    "degree" TEXT,
    "subjectMajor" TEXT,
    "institution" TEXT,
    "passingYear" INTEGER,
    "cgpa" TEXT,
    "teacherId" TEXT NOT NULL,
    "designation" TEXT,
    "department" TEXT,
    "experience" TEXT,
    "joiningDate" TIMESTAMP(3) NOT NULL,
    "skills" TEXT,
    "publications" TEXT,
    "bloodGroup" TEXT,
    "emergencyName" TEXT,
    "emergencyPhone" TEXT,
    "username" TEXT,
    "password" TEXT NOT NULL,
    "profilePicture" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_email_key" ON "Teacher"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_teacherId_key" ON "Teacher"("teacherId");
