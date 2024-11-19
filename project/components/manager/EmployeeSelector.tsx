import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Check } from "lucide-react";

const EmployeeSelector = ({ employees, onBack, onSelect }) => {
    console.log(employees)
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const filteredEmployees = employees.filter(employee =>
    employee.Name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = () => {
    if (selectedEmployee) {
      onSelect(selectedEmployee);
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search employees..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid gap-4 max-h-[400px] overflow-y-auto">
        {employees.map((employee) => (
          <Card
            key={employee.id}
            className={`cursor-pointer transition-colors ${
              selectedEmployee?.id === employee.id
                ? "border-primary"
                : "hover:border-primary/50"
            }`}
            onClick={() => setSelectedEmployee(employee)}
          >
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{employee.Name}</h3>
                <p className="text-sm text-gray-600">{employee.role}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {employee.skills.map((skill) => (
                    <Badge key={skill.id} variant="secondary">
                      {skill.name}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2 mt-2">
                  <Badge variant="outline">
                    Productivity: {employee.productivity}%
                  </Badge>
                </div>
              </div>
              {selectedEmployee?.id === employee.id && (
                <Check className="h-5 w-5 text-primary" />
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button
          onClick={handleSelect}
          disabled={!selectedEmployee}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default EmployeeSelector;