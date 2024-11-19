import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";

const TaskReview = ({ taskData, onBack, onSubmit }) => {
  const form = useForm({
    defaultValues: taskData
  });

  // Updated form submission handler
const handleSubmit = form.handleSubmit(async (data) => {
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          task_name: data.task_name,
          task_description: data.task_description,
          additional_notes: data.additional_notes,
          priority: data.priority,
          deadline: data.deadline,
          required_skills: data.required_skills,
          assigned_to: taskData.assigned_to,
          status: "pending",
          created_at: new Date().toISOString(),
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to create task');
      }
  
      const result = await response.json();
      
      
      
      // Optional: Reset form
      form.reset();
    } catch (error) {
      console.log(error);
      
    }
  });

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-2">Selected Employee</h3>
          <div className="space-y-2">
            <p className="text-lg font-medium">{taskData.assigned_to.Name}</p>
            <p className="text-sm text-gray-600">{taskData.assigned_to.email}</p>
            <div className="flex flex-wrap gap-2">
              {taskData.assigned_to.skills.map((skill) => (
                <Badge key={skill.id} variant="secondary">
                  {skill.name}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            control={form.control}
            name="task_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Task Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="task_description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="space-y-2">
            <FormLabel>Required Skills</FormLabel>
            <div className="flex flex-wrap gap-2">
              {taskData.required_skills.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Priority</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="deadline"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Deadline</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="additional_notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Notes</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={onBack}>
              Back
            </Button>
            <Button type="submit">
              Assign Task
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default TaskReview;