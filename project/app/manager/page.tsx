"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TaskAssignmentDialog from "@/components/manager/taskAssignmentDialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Users,
  Trophy,
  Target,
  Clock,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { EmployeePerformanceChart } from "@/components/manager/performance-chart";
import { TaskManagement } from "@/components/manager/task-management";

interface Employee {
  id: string;
  Name: string;
  email: string;
}


export default function ManagerDashboard() {
  const [selectedEmployee, setSelectedEmployee] = useState<string>("all");
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [employees,setEmployees] = useState<Employee[]>([]);
  const [tasks,setTasks] = useState([])

  

  useEffect(()=>{
    async function fetchEmployees() {
      try {
        const response = await fetch("/api/employees");
        console.log("Response status:", response.status);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.details || `HTTP error! status: ${response.status}`
          );
        }

        const data = await response.json();
        console.log("Fetched data:", data);
        setEmployees(data);
      } catch (error) {
        console.error("Error details:", error);
        setError(
          error instanceof Error ? error.message : "Failed to fetch requests"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchEmployees();
    async function fetchTasks() {
      try {
        const response = await fetch("/api/tasks");
        console.log("Response status:", response);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.details || `HTTP error! status: ${response.status}`
          );
        }

        const data = await response.json();
        console.log("Fetched data:", data);
        setTasks(data);
      } catch (error) {
        console.error("Error details:", error);
        setError(
          error instanceof Error ? error.message : "Failed to fetch requests"
        );
      } finally {
        setLoading(false);
      }
    }
    fetchTasks()
  },[])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Manager Dashboard</h1>
        <TaskAssignmentDialog employees_raw={employees} />
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{employees.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Points</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                tasks.filter(task => task.state == 'done').reduce((acc, task) => acc + task.weight, 0) /
                  tasks.filter(task => task.state == 'done').length
              )}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasks Completed</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {tasks.filter(task => task.state == 'done').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Productivity
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(Math.random() * (95 - 70) + 70).toFixed(2)}
              %
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Employee Rankings</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Points</TableHead>
                  <TableHead>Trend</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[...employees]
                  .sort((a, b) => b.points - a.points)
                  .map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell className="font-medium">
                        {employee.Name}
                      </TableCell>
                      <TableCell>{employee.posts.name}</TableCell>
                      <TableCell>{Math.floor(Math.random() * (50 - 10 + 1)) + 10}</TableCell>
                      <TableCell>
                        {Math.random()>0.5 ? (
                          <Badge className="bg-green-500">
                            <ArrowUp className="h-4 w-4" />
                          </Badge>
                        ) : (
                          <Badge variant="destructive">
                            <ArrowDown className="h-4 w-4" />
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <EmployeePerformanceChart />
          </CardContent>
        </Card>
      </div>

      <TaskManagement tasks={tasks}/>
    </div>
  );
}