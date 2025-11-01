import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const {
      fullName,
      dob,
      motherName,
      fatherName,
      studentId,
      phone,
      class: studentClass,
      group,
      passingYear,
      bloodGroup,
      password,
      profilePicture,
    } = data;

    // Check if student ID already exists
    const existingStudent = await prisma.student.findUnique({
      where: { studentId },
    });
    if (existingStudent) {
      return NextResponse.json({
        success: false,
        error: 'Student ID already registered',
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert student
    const student = await prisma.student.create({
      data: {
        fullName,
        dob: new Date(dob), 
        motherName,
        fatherName,
        studentId,
        phone,
        className: studentClass,
        groupName: group,
        passingYear: Number(passingYear),
        bloodGroup,
        password: hashedPassword,
        profilePicture, // base64 string
      },
    });

    return NextResponse.json({ success: true, student });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ success: false, error: err.message });
  }
}
