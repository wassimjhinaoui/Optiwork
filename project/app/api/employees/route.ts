// app/api/employees/route.ts
import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Test database connection first
    await prisma.$connect()
    console.log('Database connection successful')

    const employees = await prisma.employees.findFirst({
      include: {
        posts: true,
        skills: true,
        Tasks: true,
      },
    })

    console.log('Query result:', employees)

    if (!employees) {
      console.log('No employees found')
      return NextResponse.json(
        { message: 'No employees found' },
        { status: 404 }
      )
    }

    return NextResponse.json(employees)
  } catch (error) {
    // Log detailed error information
    console.error('Detailed error:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
    })

    return NextResponse.json(
      { 
        error: 'Failed to fetch employees',
        details: error.message 
      },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}