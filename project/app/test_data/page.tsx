'use client'
import { useEffect, useState } from 'react'

interface Employee {
  id: string
  Name: string
  email: string
}

interface Request {
  id: string
  name: string
  empId: string
  type: string
  state: string
  fromDate: string
  toDate : string
  Description: string
  employees: Employee
}

export default function RequestsPage() {
  const [requests, setRequests] = useState<Request[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchRequests() {
      try {
        const response = await fetch('/api/requests')
        console.log('Response status:', response.status)

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.details || `HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        console.log('Fetched data:', data)
        setRequests(data)
      } catch (error) {
        console.error('Error details:', error)
        setError(error instanceof Error ? error.message : 'Failed to fetch requests')
      } finally {
        setLoading(false)
      }
    }

    fetchRequests()
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

  if (requests.length === 0) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">No requests found</h1>
      </div>
    )
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Requests List</h1>
      {requests.map((request) => (
        <div 
          key={request.id} 
          className="border p-4 rounded-lg shadow hover:shadow-md transition-shadow mb-4"
        >
          <h2 className="text-xl font-semibold">{request.name}</h2>
          <p className="text-gray-700">Type: {request.type}</p>
          <p className="text-gray-700">State: {request.state}</p>
          <p className="text-gray-600">Description: {request.Description}</p>
          
          <div className="mt-2 border-t pt-2">
            <p className="font-medium">Employee Details:</p>
            <p className="text-gray-600">Name: {request.employees.Name}</p>
            <p className="text-gray-600">Email: {request.employees.email}</p>
          </div>
        </div>
      ))}
    </div>
  )
}