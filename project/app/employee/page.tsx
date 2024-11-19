"use client";

import WorkTimer from "@/components/employee/work-timer";
import TaskCard from "@/components/employee/task-card";
import BreakRoom from "@/components/employee/break-room";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";

function getDayPercentage(issuedTime, deadline) {
  // Convert datetime strings to Date objects
  const issued = new Date(issuedTime);
  const end = new Date(deadline);
  const today = new Date();
  
  // Normalize today's date to the start of the day (midnight)
  today.setHours(0, 0, 0, 0);
  
  // Normalize the issued and deadline times to the start of their respective days
  issued.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  // Calculate the total time between issued time and deadline in milliseconds
  const totalDuration = end - issued;
  if (totalDuration <= 0) {
      throw new Error('Deadline must be later than issued time');
  }

  // Calculate the time passed since issued time until today
  const elapsedTime = today - issued;

  // Calculate the percentage of the day completed
  const percentage = ((elapsedTime / totalDuration) * 100).toFixed(2);

  // Ensure that we return 0 if today's date is before the issued time
  return Math.max(0, Math.min(100, parseFloat(percentage)));
}


function formatTasks(tasks){
 return tasks.map(task =>({"id":task.id,"weight":task.weight,"description":task.description,"deadline":task.dates[0].deadline}))
}

export default function EmployeeDashboard() {

  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tasks,setTasks] = useState([])
  const employeeId = 1

  useEffect(() => {
    async function fetchTasks() {
      try {
        // Fetch tasks for the employee
        const response = await fetch(`/api/tasks/employee/${employeeId}`);
        console.log("Response status:", response);
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.details || `HTTP error! status: ${response.status}`
          );
        }
  
        const data = await response.json();
        console.log("Fetched data:", data);
  
        // Communicate with the AI
        try {
          const aiResponse = await fetch("http://localhost:5000/recommend_task", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
            },
            body: JSON.stringify({
              tasks: formatTasks(data),
            }),
          });
  
          console.log("AI Response:", aiResponse);
  
          if (aiResponse.ok) {
            const result = await aiResponse.json();
            console.log("AI Processed Result:", result);
          } else {
            console.error("Failed to get AI recommendation:", aiResponse.statusText);
          }
        } catch (aiError) {
          console.error("Error communicating with AI:", aiError);
        }
  
        // Set tasks in state
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setError(
          error instanceof Error ? error.message : "Failed to fetch tasks"
        );
      } finally {
        setLoading(false);
      }
    }
  
    fetchTasks();
  }, [employeeId]);
  

  
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
            title={task.name}
            progress={getDayPercentage(task.dates[0].issued,task.dates[0].deadline)}
            weight={task.weight}
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