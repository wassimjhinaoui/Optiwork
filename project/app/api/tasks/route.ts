// api/tasks/route.ts
import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'


// types/task.ts
type TaskCreateInput = {
    task_name: string;
    task_description: string;
    priority: 'high' | 'medium' | 'low';
    deadline: string;
    created_at: string;
    required_skills: string[];
    assigned_to: {
      id: string;
      Name: string;
      email: string;
    };
    status: 'pending' | 'in_progress' | 'done';
  }

  function safeSerialize(data: any) {
    return JSON.parse(JSON.stringify(data, (key, value) => 
      typeof value === 'bigint' ? value.toString() : value
    ))
  }

export async function POST(req: Request) {
  try {
    const body = await req.json() as TaskCreateInput;
    console.log('Request body:', body);

    // Validate required fields
    if (!body.task_name || !body.task_description || !body.assigned_to?.id) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Convert state to Tasks_state enum
    const taskState = body.status as Tasks_state || 'pending';

    // Create the task with proper typing
    const task = await prisma.tasks.create({
      data: {
        name: body.task_name,
        description: body.task_description,
        state: taskState,
        weight: BigInt(body.priority === 'high' ? 3 : body.priority === 'medium' ? 2 : 1),
        empId: BigInt(body.assigned_to.id),
        dates: {
          create: {
            started: new Date(),
            finished: new Date(), // Will be updated when task is done
            issued: new Date(),
            deadline: new Date(body.deadline)
          }
        },
        skills: {
          create: body.required_skills?.map((skill: string) => ({
            name: skill
          })) || []
        }
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
      }
    })
    
    return NextResponse.json(safeSerialize(task))
  } catch (error) {
    console.error('Full error:', error);
    return NextResponse.json(
      { error: 'Error creating task', details: error.message },
      { status: 500 }
    )
  }
}


export async function GET() {
    try {
      console.log('Attempting to fetch tasks...');
      
      const tasks = await prisma.tasks.findMany({
        include: {
          dates: true,
          skills: true,
          employees: {
            include: {
              posts: true,
              skills: true
            }
          }
        }
      })
      
      console.log('Tasks fetched successfully:', tasks.length);
      
      return NextResponse.json(safeSerialize(tasks))
    } catch (error) {
      // Log the full error details
      console.error('Error fetching tasks:', error);
      
      // If it's a Prisma error, log additional details
      if (error instanceof Error) {
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
      }
      
      return NextResponse.json(
        { 
          error: 'Error fetching tasks', 
          details: error instanceof Error ? error.message : 'Unknown error' 
        }, 
        { status: 500 }
      )
    }
  }