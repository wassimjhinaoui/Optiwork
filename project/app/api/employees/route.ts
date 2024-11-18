/*
// Fetch all employees
GET /api/employees

// Fetch employee with ID 123
GET /api/employees?id=123

// Create a new employee
POST /api/employees
body: { 
  Name: "John Doe", 
  email: "john@example.com" 
}

// Update employee with ID 123
PUT /api/employees?id=123
body: { 
  Name: "John Updated", 
  email: "john.updated@example.com" 
}

// Delete employee with ID 123
DELETE /api/employees?id=123
*/

import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

// Utility function for safe serialization
function safeSerialize(data: any) {
  return JSON.parse(JSON.stringify(data, (key, value) => 
    typeof value === 'bigint' ? value.toString() : value
  ))
}

// Utility function for error handling
function handleServerError(error: any) {
  console.error('Detailed server error:', {
    name: error.name,
    message: error.message,
    stack: error.stack,
    type: typeof error
  })

  return NextResponse.json(
    {
      error: 'Internal Server Error',
      details: error.message || 'Unknown error occurred',
      type: error.constructor.name
    },
    { status: 500 }
  )
}

// Get all employees
async function getAllEmployees() {
  const employees = await prisma.employees.findMany({
    select: {
      id: true,
      Name: true,
      email: true,
      posts: {
        select: {
          description: true,
          name: true
        }
      },
      skills: {
        select: {
          id: true,
          name: true
        }
      },
      Tasks: {
        select: {
          id: true,
          name: true
        }
      }
    }
  })

  if (!employees || employees.length === 0) {
    return NextResponse.json(
      { message: 'No employees found' },
      { status: 404 }
    )
  }

  return NextResponse.json(safeSerialize(employees))
}

// Get employee by ID
async function getEmployeeById(id: string) {
  const employee = await prisma.employees.findUnique({
    where: { id: BigInt(id) },
    select: {
      id: true,
      Name: true,
      email: true,
      posts: {
        select: {
          description: true,
          name: true
        }
      },
      skills: {
        select: {
          id: true,
          name: true
        }
      },
      Tasks: {
        select: {
          id: true,
          name: true
        }
      }
    }
  })

  if (!employee) {
    return NextResponse.json(
      { message: 'Employee not found' },
      { status: 404 }
    )
  }

  return NextResponse.json(safeSerialize(employee))
}

// Create a new employee
async function createEmployee(data: any) {
  try {
    const newEmployee = await prisma.employees.create({
      data: {
        Name: data.Name,
        email: data.email,
        // Add other fields as necessary
      }
    })

    return NextResponse.json(safeSerialize(newEmployee), { status: 201 })
  } catch (error) {
    // Handle unique constraint violations or other creation errors
    return NextResponse.json(
      { 
        message: 'Failed to create employee',
        details: error.message 
      }, 
      { status: 400 }
    )
  }
}

// Update an employee
async function updateEmployee(id: string, data: any) {
  try {
    const updatedEmployee = await prisma.employees.update({
      where: { id: BigInt(id) },
      data: {
        Name: data.Name,
        email: data.email,
        // Add other updatable fields
      }
    })

    return NextResponse.json(safeSerialize(updatedEmployee))
  } catch (error) {
    return NextResponse.json(
      { 
        message: 'Failed to update employee',
        details: error.message 
      }, 
      { status: 400 }
    )
  }
}

// Delete an employee
async function deleteEmployee(id: string) {
  try {
    await prisma.employees.delete({
      where: { id: BigInt(id) }
    })

    return NextResponse.json(
      { message: 'Employee deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { 
        message: 'Failed to delete employee',
        details: error.message 
      }, 
      { status: 400 }
    )
  }
}

// Main route handler
export async function GET(request: NextRequest) {
  try {
    await prisma.$connect()

    // Extract ID from URL if present
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    // Route based on presence of ID
    return id 
      ? await getEmployeeById(id)
      : await getAllEmployees()

  } catch (error) {
    return handleServerError(error)
  } finally {
    await prisma.$disconnect()
  }
}

// POST route for creating employees
export async function POST(request: NextRequest) {
  try {
    await prisma.$connect()

    // Parse request body
    const data = await request.json()
    return await createEmployee(data)

  } catch (error) {
    return handleServerError(error)
  } finally {
    await prisma.$disconnect()
  }
}

// PUT route for updating employees
export async function PUT(request: NextRequest) {
  try {
    await prisma.$connect()

    // Extract ID from URL
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { message: 'Employee ID is required' },
        { status: 400 }
      )
    }

    // Parse request body
    const data = await request.json()
    return await updateEmployee(id, data)

  } catch (error) {
    return handleServerError(error)
  } finally {
    await prisma.$disconnect()
  }
}

// DELETE route for removing employees
export async function DELETE(request: NextRequest) {
  try {
    await prisma.$connect()

    // Extract ID from URL
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { message: 'Employee ID is required' },
        { status: 400 }
      )
    }

    return await deleteEmployee(id)

  } catch (error) {
    return handleServerError(error)
  } finally {
    await prisma.$disconnect()
  }
}