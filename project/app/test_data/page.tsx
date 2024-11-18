'use client'
import { useEffect, useState } from 'react'

interface Post {
  name: number
  description: string
}

interface Skill {
  id: number
  name: string
}

interface Task {
  id: number
  name: string
}

interface Employee {
  id: number
  Name: string
  email: string
  post: Post
  tasks: Task[]
  skills: Skill[]
}

export default function EmployeesPage() {
  const [employee, setEmployee] = useState<Employee | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchEmployee() {
      try {
        const response = await fetch('/api/employees')
        console.log('Response status:', response.status)
        
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.details || `HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        console.log('Fetched data:', data)
        setEmployee(data)
      } catch (error) {
        console.error('Error details:', error)
        setError(error instanceof Error ? error.message : 'Failed to fetch employee')
      } finally {
        setLoading(false)
      }
    }

    fetchEmployee()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 text-red-600">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p>{error}</p>
      </div>
    )
  }

  if (!employee) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">No employee found</h1>
      </div>
    )
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Employee Details</h1>
      <div className="border p-4 rounded-lg shadow hover:shadow-md transition-shadow">
        <h2 className="text-xl font-semibold">{employee.Name}</h2>
        <p className="text-gray-600">{employee.email}</p>
        <p className="text-gray-700">Position: {employee.post.description}</p>
        
        {employee.skills.length > 0 && (
          <div className="mt-2">
            <p className="font-medium">Skills:</p>
            <ul className="list-disc list-inside">
              {employee.skills.map((skill) => (
                <li key={skill.id} className="text-gray-600">
                  {skill.name}
                </li>
              ))}
            </ul>
          </div>
        )}

        {employee.tasks.length > 0 && (
          <div className="mt-2">
            <p className="font-medium">Tasks:</p>
            <ul className="list-disc list-inside">
              {employee.tasks.map((task) => (
                <li key={task.id} className="text-gray-600">
                  {task.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}