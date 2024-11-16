"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Users, BarChart } from "lucide-react";

export default function HRDashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const leaveRequests = [
    {
      id: 1,
      employee: "John Doe",
      type: "Vacation",
      startDate: "2024-04-01",
      endDate: "2024-04-05",
      status: "Pending",
      performance: "Excellent",
      attendance: "98%",
    },
    {
      id: 2,
      employee: "Jane Smith",
      type: "Sick Leave",
      startDate: "2024-04-03",
      endDate: "2024-04-04",
      status: "Pending",
      performance: "Good",
      attendance: "95%",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">HR Dashboard</h1>
        <Button>
          <Users className="mr-2 h-4 w-4" />
          Add Employee
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Leave Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Team Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Users className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Total Employees</p>
                  <p className="text-2xl font-bold">156</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <CalendarDays className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">On Leave Today</p>
                  <p className="text-2xl font-bold">8</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <BarChart className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Average Performance</p>
                <p className="text-2xl font-bold">87%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Leave Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Performance</TableHead>
                <TableHead>Attendance</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaveRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium">{request.employee}</TableCell>
                  <TableCell>{request.type}</TableCell>
                  <TableCell>
                    {request.startDate} to {request.endDate}
                  </TableCell>
                  <TableCell>{request.performance}</TableCell>
                  <TableCell>{request.attendance}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{request.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="default">
                        Approve
                      </Button>
                      <Button size="sm" variant="destructive">
                        Reject
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}