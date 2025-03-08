// app/doctors/[id]/page.tsx
'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import DoctorProfile from '@/components/Doctor/DoctorProfile'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

export default function DoctorProfilePage() {
  const { id } = useParams()
  const [doctor, setDoctor] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/doctors/${id}`)
        if (!response.ok) throw new Error('Doctor not found')
        const data = await response.json()
        setDoctor(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load doctor')
      } finally {
        setLoading(false)
      }
    }

    fetchDoctor()
  }, [id])

  if (loading) return <LoadingSpinner />
  if (error) return <div className="text-center py-12 text-red-600">{error}</div>
  if (!doctor) return <div className="text-center py-12">Doctor not found</div>

  return <DoctorProfile doctor={doctor} />
}