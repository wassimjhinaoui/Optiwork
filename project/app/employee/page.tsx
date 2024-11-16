"use client";

import WorkTimer from "@/components/employee/work-timer";
import TaskCard from "@/components/employee/task-card";
import BreakRoom from "@/components/employee/break-room";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

const tasks = [
  { id: 1, title: "Complete project documentation", points: Math.floor(Math.random() * 100)+50,progress: Math.floor(Math.random() * 100), weight: "High" },
  { id: 2, title: "Review code changes", points: Math.floor(Math.random() * 100)+50,progress: Math.floor(Math.random() * 100), weight: "Medium" },
  { id: 3, title: "Team meeting preparation", points: Math.floor(Math.random() * 100)+50,progress: Math.floor(Math.random() * 100), weight: "Low" },
] as const;

export default function EmployeeDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Employee Dashboard</h1>
        <WorkTimer />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            title={task.title}
            progress={task.progress}
            weight={task.weight}
            points={task.points}
          />
        ))}
      </div>

      <BreakRoom />
{/*
      <Card>
        <CardHeader>
          <CardTitle>HR Assistant</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <CheckCircle2 className="h-6 w-6 text-primary" />
              <div>
                <h3 className="font-semibold">Quick HR Support</h3>
                <p className="text-sm text-muted-foreground">
                  Get instant answers to common HR questions and policy inquiries
                </p>
              </div>
            </div>
            <Button className="w-full">Start Chat with HR Assistant</Button>
          </div>
        </CardContent>
      </Card>*/}
    </div>
  );
}