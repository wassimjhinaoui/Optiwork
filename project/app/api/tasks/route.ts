// api/tasks/route.ts
import prisma  from '@/lib/prisma'
import { NextResponse } from 'next/server'

// Create Task
export async function POST(req: Request) {
  try {
    const body = await req.json()
    console.log(body);
    
    const task = await prisma.tasks.create({
      data: {
        name: body.task_name,
        description: body.task_description,
        state: "pending",
        weight: body.priority === 'high' ? 3 : body.priority === 'medium' ? 2 : 1,
        empId: BigInt(body.assigned_to.id),
        dates: {
          create: {
            started: new Date(),
            finished: new Date(), // Will be updated when task is done
            issued: new Date(body.created_at),
            deadline: new Date(body.deadline)
          }
        },
        skills: {
          create: body.required_skills.map((skill: string) => ({
            name: skill
          }))
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

    return NextResponse.json(task)
  } catch (error) {
    return NextResponse.json({ error: 'Error creating task' }, { status: 500 })
  }
}

// Get All Tasks
export async function GET() {
  try {
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
    return NextResponse.json(tasks)
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching tasks' }, { status: 500 })
  }
}
