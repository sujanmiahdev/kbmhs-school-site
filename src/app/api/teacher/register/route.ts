import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';

// Teacher Registration API
export async function POST(req: Request) {
  try {
    const data = await req.json();

    const {
      basic,
      contact,
      academic,
      professional,
      extra,
      credentials,
      profilePicture,
    } = data;

    const { fullName, fatherName, motherName, dob, gender, nid, maritalStatus } = basic || {};
    const { phone, email, presentAddress, permanentAddress } = contact || {};
    const { degree, subjectMajor, institution, passingYear, cgpa } = academic || {};
    const { teacherId, designation, department, experience, joiningDate } = professional || {};
    const { skills, publications, bloodGroup, emergencyContact } = extra || {};
    const { username, password } = credentials || {};

    // ✅ 1. check if email or teacherId already exists
    const existingTeacher = await prisma.teacher.findFirst({
      where: {
        OR: [{ email }, { teacherId }],
      },
    });

    if (existingTeacher) {
      return NextResponse.json(
        { success: false, error: 'Teacher already registered' },
        { status: 400 }
      );
    }

    // ✅ 2. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ 3. Save teacher data in Prisma
    const teacher = await prisma.teacher.create({
      data: {
        fullName,
        fatherName,
        motherName,
        dob: new Date(dob),
        gender,
        nid,
        maritalStatus,
        phone,
        email,
        presentAddress,
        permanentAddress,
        degree,
        subjectMajor,
        institution,
        passingYear: passingYear ? Number(passingYear) : null,
        cgpa,
        teacherId,
        designation,
        department,
        experience,
        joiningDate: new Date(joiningDate),
        skills,
        publications,
        bloodGroup,
        emergencyName: emergencyContact?.name || '',
        emergencyPhone: emergencyContact?.phone || '',
        username,
        password: hashedPassword,
        profilePicture, // base64 string
      },
    });

    return NextResponse.json({ success: true, teacher });
  } catch (err: any) {
    console.error('Teacher Registration Error:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
