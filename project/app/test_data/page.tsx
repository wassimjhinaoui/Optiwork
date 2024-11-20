'use client'
import { useEffect, useState } from 'react'


export default function RequestsPage() {
  const [requests, setRequests] = useState<Request[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchRequests() {
      try {
        const response = await fetch("http://flask:5000/health");
        console.log(
          response
        );
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
      abcd
    </div>
  )
}