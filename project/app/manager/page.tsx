"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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

export default function ManagerDashboard() {
  const [selectedEmployee, setSelectedEmployee] = useState<string>("all");

  const employees = [
    {
      id: 1,
      name: "John Doe",
      role: "Frontend Developer",
      points: 850,
      tasksCompleted: 15,
      productivity: 92,
      trend: "up",
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "Backend Developer",
      points: 780,
      tasksCompleted: 12,
      productivity: 88,
      trend: "down",
    },
    {
      id: 3,
      name: "Mike Johnson",
      role: "UI Designer",
      points: 920,
      tasksCompleted: 18,
      productivity: 95,
      trend: "up",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Manager Dashboard</h1>
        <div className="flex items-center space-x-4">
          <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select Employee" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Employees</SelectItem>
              {employees.map((employee) => (
                <SelectItem key={employee.id} value={employee.id.toString()}>
                  {employee.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button>
            <Target className="mr-2 h-4 w-4" />
            Assign Task
          </Button>
        </div>
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
                employees.reduce((acc, emp) => acc + emp.points, 0) /
                  employees.length
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
              {employees.reduce((acc, emp) => acc + emp.tasksCompleted, 0)}
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
              {Math.round(
                employees.reduce((acc, emp) => acc + emp.productivity, 0) /
                  employees.length
              )}
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
                        {employee.name}
                      </TableCell>
                      <TableCell>{employee.role}</TableCell>
                      <TableCell>{employee.points}</TableCell>
                      <TableCell>
                        {employee.trend === "up" ? (
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

      <TaskManagement />
    </div>
  );
}