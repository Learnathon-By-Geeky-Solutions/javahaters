'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar/Navbar'
import Link from 'next/link'  // Add this import for navigation

type Doctor = {
  id: string
  name: string
  specialty: string
  hospital: string
  rating: number
  visitFee: number
  online: boolean
}

export default function SearchDoctorPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([])  // Default is empty array
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [specialties, setSpecialties] = useState<string[]>([]) // State to store specialties
  
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState('all')
  const [sortBy, setSortBy] = useState('rating')

  // Fetch doctors from API
  useEffect(() => {
    async function fetchDoctors() {
      try {
        setIsLoading(true)
        const response = await fetch('http://localhost:8080/api/doctors?page=1&size=10', {
          headers: {
            'Accept': 'application/json'
          }
        })

        if (!response.ok) {
          throw new Error('Failed to fetch doctors')
        }

        const data = await response.json()
        setDoctors(data)
        
        // Extract unique specialties from the fetched doctors data
        const uniqueSpecialties = [
          ...new Set(data.map((doctor: Doctor) => doctor.specialty))
        ]
        setSpecialties(uniqueSpecialties)
        
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
        setDoctors([]) // Ensure doctors is an empty array on error
      } finally {
        setIsLoading(false)
      }
    }

    fetchDoctors()
  }, [])

  // Ensure `doctors` is always an array before using .filter()
  const filteredDoctors = (doctors || [])
    .filter(doctor => {
      const matchesSearch = 
        (doctor.name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        (doctor.hospital?.toLowerCase() || '').includes(searchQuery.toLowerCase())
      const matchesSpecialty = selectedSpecialty === 'all' || 
        (doctor.specialty?.toLowerCase() || '') === selectedSpecialty.toLowerCase()
      return matchesSearch && matchesSpecialty
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating
      if (sortBy === 'visitFee') return a.visitFee - b.visitFee
      return a.name?.localeCompare(b.name || '') || 0
    })

  // Render loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl text-gray-700 bg-white p-8 rounded-lg shadow-sm">Loading doctors...</div>
      </div>
    )
  }

  // Render error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-red-600 text-xl bg-white p-8 rounded-lg shadow-sm">
          Error: {error}
          <button 
            onClick={() => window.location.reload()} 
            className="ml-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        {/* Search and Filter Section (Same as before) */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search doctors by name or hospital..."
              className="w-full p-3 border rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-4 text-gray-400" />
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <select
              className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
            >
              <option value="all">All Specialties</option>
              {specialties.map((specialty, index) => (
                <option key={index} value={specialty}>
                  {specialty}
                </option>
              ))}
            </select>

            <select
              className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="rating">Sort by Rating</option>
              <option value="visitFee">Sort by visitFee</option>
              <option value="name">Sort by Name</option>
            </select>
          </div>
        </div>

        {/* Doctors List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <div key={doctor.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{doctor.name}</h3>
                  <p className="text-gray-600">{doctor.specialty}</p>
                  <p className="text-sm text-gray-500 mt-2">{doctor.hospital}</p>
                </div>
                <span className={`inline-block w-3 h-3 rounded-full ${doctor.online ? 'bg-green-500' : 'bg-gray-300'}`} />
              </div>
              
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center">
                  <StarIcon className="h-5 w-5 text-yellow-400" />
                  <span className="ml-1">{doctor.rating}</span>
                </div>
                <span className="text-primary font-semibold">${doctor.visitFee}</span>
              </div>
              
              <div className="mt-4">
                <Link 
                  href={`/doctors/${doctor.id}`}
                  className="block w-full text-center py-2 px-4 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
                >
                  View Profile
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredDoctors.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No doctors found matching your criteria
          </div>
        )}
      </main>
    </div>
  )
}

// Icons remain the same as in the original file
const MagnifyingGlassIcon = ({ ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
    />
  </svg>
)

const StarIcon = ({ ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
      clipRule="evenodd"
    />
  </svg>
)
