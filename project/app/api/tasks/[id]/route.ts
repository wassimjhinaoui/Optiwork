
// api/tasks/[id]/route.ts
import prisma  from '@/lib/prisma'
import { NextResponse } from 'next/server'

// Get Single Task
export async function GET(
    req: Request,
    { params }: { params: { id: string } }
  ) {
    try {
      const task = await prisma.tasks.findUnique({
        where: {
          id: BigInt(params.id)
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
  
      if (!task) {
        return NextResponse.json({ error: 'Task not found' }, { status: 404 })
      }
  
      return NextResponse.json(task)
    } catch (error) {
      return NextResponse.json({ error: 'Error fetching task' }, { status: 500 })
    }
  }
  
  // Update Task
  export async function PUT(
    req: Request,
    { params }: { params: { id: string } }
  ) {
    try {
      const body = await req.json()
  
      const task = await prisma.tasks.update({
        where: {
          id: BigInt(params.id)
        },
        data: {
          name: body.task_name,
          description: body.task_description,
          state: body.status,
          weight: body.priority === 'high' ? 3 : body.priority === 'medium' ? 2 : 1,
          dates: {
            update: {
              where: {
                taskId: BigInt(params.id)
              },
              data: {
                deadline: new Date(body.deadline),
                finished: body.status === 'done' ? new Date() : undefined
              }
            }
          },
          skills: {
            deleteMany: {},
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
      return NextResponse.json({ error: 'Error updating task' }, { status: 500 })
    }
  }
  
  // Delete Task
  export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
  ) {
    try {
      // Delete related records first
      await prisma.dates.deleteMany({
        where: {
          taskId: BigInt(params.id)
        }
      })
  
      await prisma.skills.deleteMany({
        where: {
          taskId: BigInt(params.id)
        }
      })
  
      // Delete the task
      await prisma.tasks.delete({
        where: {
          id: BigInt(params.id)
        }
      })
  
      return NextResponse.json({ message: 'Task deleted successfully' })
    } catch (error) {
      return NextResponse.json({ error: 'Error deleting task' }, { status: 500 })
    }
  }