import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Target } from "lucide-react";
import TaskDetailsForm from './TaskDetailsForm';
import EmployeeSelector from './EmployeeSelector';
import TaskReview from './TaskReview';


const parseAssignment = (response) => {
  try {
    // Remove ```json and ``` markers and trim whitespace
    const jsonString = response.assignment
      .replace(/```json\n/, '')  // Remove opening ```json
      .replace(/\n```$/, '')     // Remove closing ```
      .trim();                   // Remove extra whitespace
    
    // Parse the cleaned JSON string
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Error parsing assignment:', error);
    return null;
  }
};

const TaskAssignmentDialog = ({ employees_raw }) => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [taskData, setTaskData] = useState(null);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  
  // Format employees data
  const formatEmployeesData = (rawEmployees) => {
    return rawEmployees.map(emp => ({
      id: emp.id,
      name: emp.Name,
      skills: emp.skills.map(skill => skill.name),
      availability: true,
      role: emp.role || "Employee", // Fallback if role isn't provided
      tasksCompleted: emp.tasksCompleted || 0,
      productivity: emp.productivity || 0
    }));
  };

  const handleClose = () => {
    setOpen(false);
    setStep(1);
    setTaskData(null);
    setSelectedEmployees([]);
  };

  const handleTaskSubmit = async (formData) => {
    setTaskData(formData);
    
    // Send to API to get best-fit employees
    try {
      const response = await fetch("http://flask:5000/assign_task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          employees: formatEmployeesData(employees_raw),
          task: formData
        }),
      });
      console.log(
        response
      );
      
      if (response.ok) {
        const result = await response.json();
        const parsedResult = parseAssignment(result);
        console.log(parsedResult);
        const matchedEmployees = employees_raw.filter(emp => 
          parsedResult.assigned_employees.includes(Number(emp.id))
        );
        console.log(matchedEmployees)
        setSelectedEmployees(matchedEmployees);
        setStep(2);
      } else {
        console.error("Failed to get employee matches:", response.statusText);
      }
    } catch (error) {
      console.error("Error getting employee matches:", error);
    }
  };

  const handleEmployeeSelect = (selected) => {
    setTaskData(prev => ({
      ...prev,
      assigned_to: selected
    }));
    setStep(3);
  };

  const handleTaskReview = async (finalTaskData) => {
    console.log(finalTaskData)
    try {
      // Send final task data to your database
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalTaskData),
      });
      
      if (response.ok) {
        handleClose();
        // You might want to trigger a refresh of tasks list here
      }
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Target className="mr-2 h-4 w-4" />
          Assign Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {step === 1 && "Create New Task"}
            {step === 2 && "Select Employee"}
            {step === 3 && "Review Task Assignment"}
          </DialogTitle>
        </DialogHeader>

        {step === 1 && (
          <TaskDetailsForm 
            onSubmit={handleTaskSubmit}
          />
        )}

        {step === 2 && (
          <EmployeeSelector
            employees={selectedEmployees}
            onBack={() => setStep(1)}
            onSelect={handleEmployeeSelect}
          />
        )}

        {step === 3 && (
          <TaskReview
            taskData={taskData}
            onBack={() => setStep(2)}
            onSubmit={handleTaskReview}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TaskAssignmentDialog;