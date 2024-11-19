// app/api/tasks/employee/[empId]/route.ts
import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

function safeSerialize(data: any) {
    return JSON.parse(JSON.stringify(data, (key, value) => 
      typeof value === 'bigint' ? value.toString() : value
    ))
  }

// Get tasks for a specific employee
export async function GET(
  req: Request, 
  { params }: { params: { empId: string } }
) {
  try {
    // Convert empId to BigInt
    const employeeId = BigInt(params.empId);

    // Get tasks with related information
    const tasks = await prisma.tasks.findMany({
      where: {
        empId: employeeId
      },
      include: {
        dates: true,
        skills: true,
        employees: {
          include: {
            posts: true,
            skills: true
          }
        }
      },
      
    });

    // If no tasks found, return a 404
    if (tasks.length === 0) {
      return NextResponse.json(
        { message: 'No tasks found for this employee' }, 
        { status: 404 }
      );
    }

    return NextResponse.json(safeSerialize(tasks));
  } catch (error) {
    console.error('Error fetching employee tasks:', error);
    return NextResponse.json(
      { 
        error: 'Error fetching employee tasks', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      }, 
      { status: 500 }
    );
  }
}

// Update tasks for a specific employee
export async function PUT(
  req: Request, 
  { params }: { params: { empId: string } }
) {
  try {
    const employeeId = BigInt(params.empId);
    const body = await req.json();

    // Bulk update tasks for the employee
    const updatedTasks = await prisma.tasks.updateMany({
      where: {
        empId: employeeId
      },
      data: {
        // Fields you want to update across all tasks
        state: body.state,
        // Add more fields as needed
      }
    });

    return NextResponse.json({
      message: 'Tasks updated successfully',
      count: updatedTasks.count
    });
  } catch (error) {
    console.error('Error updating employee tasks:', error);
    return NextResponse.json(
      { 
        error: 'Error updating employee tasks', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      }, 
      { status: 500 }
    );
  }
}

// Delete tasks for a specific employee
export async function DELETE(
  req: Request, 
  { params }: { params: { empId: string } }
) {
  try {
    const employeeId = BigInt(params.empId);

    // Delete related dates first
    await prisma.dates.deleteMany({
      where: {
        Tasks: {
          empId: employeeId
        }
      }
    });

    // Delete related skills
    await prisma.skills.deleteMany({
      where: {
        Tasks: {
          empId: employeeId
        }
      }
    });

    // Delete tasks
    const deletedTasks = await prisma.tasks.deleteMany({
      where: {
        empId: employeeId
      }
    });

    return NextResponse.json({
      message: 'Tasks deleted successfully',
      count: deletedTasks.count
    });
  } catch (error) {
    console.error('Error deleting employee tasks:', error);
    return NextResponse.json(
      { 
        error: 'Error deleting employee tasks', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      }, 
      { status: 500 }
    );
  }
}


// Delete all tasks for an employee
const deleteEmployeeTasks = async (employeeId: string) => {
  try {
    const response = await fetch(`/api/tasks/employee/${employeeId}`, {
      method: 'DELETE'
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete tasks');
    }
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error deleting employee tasks:', error);
    throw error;
  }
};