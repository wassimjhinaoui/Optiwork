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
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const tasks = [
  {
    id: 1,
    title: "Implement new feature",
    assignee: "John Doe",
    priority: "High",
    status: "In Progress",
    weight: 8,
  },
  {
    id: 2,
    title: "Code review",
    assignee: "Jane Smith",
    priority: "Medium",
    status: "Pending",
    weight: 5,
  },
  {
    id: 3,
    title: "Update documentation",
    assignee: "Mike Johnson",
    priority: "Low",
    status: "Completed",
    weight: 3,
  },
];

export function TaskManagement() {
  const [filter, setFilter] = useState("all");

  const filteredTasks =
    filter === "all" ? tasks : tasks.filter((task) => task.priority === filter);

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Task Management</CardTitle>
          <div className="flex space-x-4">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="High">High Priority</SelectItem>
                <SelectItem value="Medium">Medium Priority</SelectItem>
                <SelectItem value="Low">Low Priority</SelectItem>
              </SelectContent>
            </Select>
            <Button>New Task</Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Task</TableHead>
              <TableHead>Assignee</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Weight</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell className="font-medium">{task.title}</TableCell>
                <TableCell>{task.assignee}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      task.priority === "High"
                        ? "destructive"
                        : task.priority === "Medium"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {task.priority}
                  </Badge>
                </TableCell>
                <TableCell>{task.weight}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      task.status === "Completed"
                        ? "default"
                        : task.status === "In Progress"
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {task.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                    <Button size="sm" variant="destructive">
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}