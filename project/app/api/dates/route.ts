/*
GET /api/date - Get all dates
GET /api/date?taskId={taskId} - Get dates for a specific task
POST /api/date - Create a new date
PUT /api/date?id={id} - Update a date
DELETE /api/date?id={id} - Delete a date
*/

import { NextRequest, NextResponse } from "next/server";
import prisma from '@/lib/prisma'

// Define interfaces
interface Date {
  id: string;
  started: string;
  finished: string;
  issued: string;
  taskId: string;
  deadline: string;
  Tasks: Task;
}

interface Task {
  id: string;
  state: string;
  weight: string;
  empId: string;
  name: string;
  description: string;
}

// GET all dates or dates by taskId
export async function GET(req: NextRequest) {
  try {
    const taskId = req.nextUrl.searchParams.get("taskId");

    if (taskId) {
      const dates = await prisma.dates.findMany({
        where: {
          taskId: BigInt(taskId)
        },
        include: {
          Tasks: true,
        },
      });
      
      if (dates.length === 0) {
        return NextResponse.json(
          { message: "No dates found for this task" },
          { status: 404 }
        );
      }
      
      return NextResponse.json(dates, { status: 200 });
    }

    // If no taskId is provided, return all dates
    const dates = await prisma.dates.findMany({
      include: {
        Tasks: true,
      },
    });
    return NextResponse.json(dates, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch dates" },
      { status: 500 }
    );
  }
}

// POST new date
export async function POST(req: NextRequest) {
  try {
    const body: Omit<Date, 'id' | 'Tasks'> = await req.json();
    
    const date = await prisma.dates.create({
      data: {
        started: new Date(body.started),
        finished: new Date(body.finished),
        issued: new Date(body.issued),
        taskId: BigInt(body.taskId),
        deadline: new Date(body.deadline),
      },
      include: {
        Tasks: true,
      },
    });
    
    return NextResponse.json(date, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create date" },
      { status: 500 }
    );
  }
}

// PUT update date
export async function PUT(req: NextRequest) {
  try {
    const body: Omit<Date, 'id' | 'Tasks'> = await req.json();
    const id = req.nextUrl.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "ID is required" },
        { status: 400 }
      );
    }

    const date = await prisma.dates.update({
      where: {
        id: BigInt(id),
      },
      data: {
        started: new Date(body.started),
        finished: new Date(body.finished),
        issued: new Date(body.issued),
        taskId: BigInt(body.taskId),
        deadline: new Date(body.deadline),
      },
      include: {
        Tasks: true,
      },
    });

    return NextResponse.json(date, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update date" },
      { status: 500 }
    );
  }
}

// DELETE date
export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "ID is required" },
        { status: 400 }
      );
    }

    await prisma.dates.delete({
      where: {
        id: BigInt(id),
      },
    });

    return NextResponse.json(
      { message: "Date deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete date" },
      { status: 500 }
    );
  }
}