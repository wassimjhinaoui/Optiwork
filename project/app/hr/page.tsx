"use client";
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
import { useEffect, useState } from "react";


interface Employee {
  id: string;
  Name: string;
  email: string;
}

interface Request {
  id: string;
  name: string;
  empId: string;
  type: string;
  state: string;
  fromDate: string;
  toDate: string;
  Description: string;
  employees: Employee;
}
export default function HRPage() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [employees,setEmployees] = useState<Employee[]>([]);
  useEffect(() => {
    async function fetchRequests() {
      try {
        const response = await fetch("/api/requests");
        console.log("Response status:", response.status);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.details || `HTTP error! status: ${response.status}`
          );
        }

        const data = await response.json();
        console.log("Fetched data:", data);
        setRequests(data);
      } catch (error) {
        console.error("Error details:", error);
        setError(
          error instanceof Error ? error.message : "Failed to fetch requests"
        );
      } finally {
        setLoading(false);
      }
    }
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

    fetchRequests();
    fetchEmployees();
  }, []);


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-600">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  

  if (requests.length === 0) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">No requests found</h1>
      </div>
    );
  }

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
                  <p className="text-2xl font-bold">{employees?.length}</p>
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
          <CardTitle>Requests</CardTitle>
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
              {requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium">
                    {request.employees.Name}
                  </TableCell>
                  <TableCell>{request.type}</TableCell>
                  <TableCell>
                    {request.fromDate
                      ? request.fromDate.substring(0, 10) +
                        " to " +
                        request.toDate.substring(0, 10)
                      : "N/A"}
                  </TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>{request.id}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{request.state}</Badge>
                  </TableCell>
                  <TableCell>
                    {request.state != "pending" ? (
                      <div className="flex space-x-2">
                        <Button size="sm" variant="default" disabled>
                          Reviewed
                        </Button>
                      </div>
                    ) : (
                      <div className="flex space-x-2">
                        <Button size="sm" variant="default">
                          Approve
                        </Button>
                        <Button size="sm" variant="destructive">
                          Reject
                        </Button>
                      </div>
                    )}
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
