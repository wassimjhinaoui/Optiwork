/*
// Fetch all requests
GET /api/requests

// Fetch request with ID 123
GET /api/requests?id=123

// Create a new request
POST /api/requests
body: { 
  name: "Vacation Request",
  empId: "123",
  type: "VACATION",
  state: "PENDING",
  Description: "Summer holiday request"
}

// Update request with ID 123
PUT /api/requests?id=123
body: { 
  name: "Updated Vacation Request",
  type: "VACATION",
  state: "APPROVED",
  Description: "Modified vacation details"
}

// Delete request with ID 123
DELETE /api/requests?id=123
*/
import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

// Utility function for safe serialization
function safeSerialize(data: any) {
  return JSON.parse(JSON.stringify(data, (key, value) =>
    typeof value === 'bigint' ? value.toString() : value
  ))
}

// Create a new request
async function createRequest(data: any) {
  try {
    const newRequest = await prisma.requests.create({
      data: {
        name: data.name,
        empId: BigInt(data.empId),
        type: data.type,
        state: data.state,
        Description: data.Description,
        fromDate: data.fromDate ? new Date(data.fromDate) : null,
        toDate: data.toDate ? new Date(data.toDate) : null
      }
    })
    return NextResponse.json(safeSerialize(newRequest), { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create request', details: error.message },
      { status: 500 }
    )
  }
}

// Update a request
async function updateRequest(id: string, data: any) {
  try {
    const updatedRequest = await prisma.requests.update({
      where: { id: BigInt(id) },
      data: {
        name: data.name,
        type: data.type,
        state: data.state,
        Description: data.Description,
        fromDate: data.fromDate ? new Date(data.fromDate) : null,
        toDate: data.toDate ? new Date(data.toDate) : null
      }
    })
    return NextResponse.json(safeSerialize(updatedRequest))
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update request', details: error.message },
      { status: 500 }
    )
  }
}

// Delete a request
async function deleteRequest(id: string) {
  try {
    await prisma.requests.delete({
      where: { id: BigInt(id) }
    })
    return NextResponse.json({ message: 'Request deleted successfully' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete request', details: error.message },
      { status: 500 }
    )
  }
}

// Get all requests with employee details
async function getAllRequests() {
    const requests = await prisma.requests.findMany({
      include: {
        employees: {
          select: {
            id: true,
            Name: true,
            email: true
          }
        }
      },
      orderBy:{
        state:"asc"
      }
    })
    
    if (!requests || requests.length === 0) {
      return NextResponse.json(
        { message: 'No requests found' },
        { status: 404 }
      )
    }
    
    // Convert BigInt to string if needed
    const serializedRequests = requests.map(request => ({
      ...request,
      id: request.id.toString(),
      empId: request.empId.toString()
    }))
    
    return NextResponse.json(safeSerialize(serializedRequests))
  }

// Get request by ID
async function getRequestById(id: string) {
  const request = await prisma.requests.findUnique({
    where: { id: BigInt(id) },
    include: {
      employees: {
        select: {
          id: true,
          Name: true,
          email: true
        }
      }
    }
  })
  
  if (!request) {
    return NextResponse.json(
      { message: 'Request not found' },
      { status: 404 }
    )
  }
  
  return NextResponse.json(safeSerialize(request))
}

export async function GET(request: NextRequest) {
  try {
    await prisma.$connect()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    return id
      ? await getRequestById(id)
      : await getAllRequests()
  } catch (error) {
    console.error('Detailed server error:', error)
    return NextResponse.json(
      {
        error: 'Internal Server Error',
        details: error.message || 'Unknown error occurred'
      },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}

export async function POST(request: NextRequest) {
  try {
    await prisma.$connect()
    const data = await request.json()
    return await createRequest(data)
  } catch (error) {
    console.error('Detailed server error:', error)
    return NextResponse.json(
      {
        error: 'Internal Server Error',
        details: error.message || 'Unknown error occurred'
      },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}

export async function PUT(request: NextRequest) {
  try {
    await prisma.$connect()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { error: 'Request ID is required' },
        { status: 400 }
      )
    }
    
    const data = await request.json()
    return await updateRequest(id, data)
  } catch (error) {
    console.error('Detailed server error:', error)
    return NextResponse.json(
      {
        error: 'Internal Server Error',
        details: error.message || 'Unknown error occurred'
      },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await prisma.$connect()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { error: 'Request ID is required' },
        { status: 400 }
      )
    }
    
    return await deleteRequest(id)
  } catch (error) {
    console.error('Detailed server error:', error)
    return NextResponse.json(
      {
        error: 'Internal Server Error',
        details: error.message || 'Unknown error occurred'
      },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}