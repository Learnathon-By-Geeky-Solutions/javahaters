// components/DoctorProfile.tsx
import { StarIcon, CalendarIcon, CurrencyDollarIcon, AcademicCapIcon, MapPinIcon } from '@heroicons/react/24/solid'

// Define the Doctor interface based on the provided columns
interface Doctor {
  id: string;
  name: string;
  area_id?: string;
  hospital_id?: string;
  hospital?: string;
  visit_fee?: number;
  available_hours?: string;
  degree?: string;
  experience?: string;
  speciality_id?: string;
  specialty?: string;
  rating?: number;
  reviewsCount?: number;
  bio?: string;
}

export default function DoctorProfile({ doctor }: { doctor: Doctor }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-sm p-8">
        {/* Profile Header */}
        <div className="flex gap-6 items-start mb-8">
          <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center">
            <span className="text-2xl font-bold text-gray-400">DR</span>
          </div>
          
          <div className="flex-1">
            <h1 className="text-3xl font-bold">{doctor.name}</h1>
            <p className="text-xl text-gray-600">{doctor.specialty}</p>
            {doctor.rating && (
              <div className="flex items-center gap-2 mt-2">
                <StarIcon className="h-5 w-5 text-yellow-400" />
                <span className="font-medium">{doctor.rating}</span>
                <span className="text-gray-500">({doctor.reviewsCount || 0} reviews)</span>
              </div>
            )}
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h2 className="text-lg font-semibold mb-2">About</h2>
              <p className="text-gray-600">{doctor.bio || "No biography available"}</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h2 className="text-lg font-semibold mb-2">Qualifications</h2>
              <div className="mb-3">
                <p className="font-medium">Degree</p>
                <p className="text-gray-600">{doctor.degree || "Not specified"}</p>
              </div>
              <div className="mb-3">
                <p className="font-medium">Experience</p>
                <p className="text-gray-600">{doctor.experience || "Not specified"}</p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h2 className="text-lg font-semibold mb-2">Contact Information</h2>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MapPinIcon className="h-5 w-5 text-blue-500" />
                  <span>{doctor.hospital || "Hospital information not available"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CurrencyDollarIcon className="h-5 w-5 text-green-500" />
                  <span>Visit Fee: ${doctor.visit_fee || "N/A"}</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h2 className="text-lg font-semibold mb-2">Availability</h2>
              <div className="p-3 bg-white rounded border">
                <p className="text-gray-600">{doctor.available_hours || "No availability information"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Book Appointment Button */}
        <div className="mt-8 text-center">
          <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  )
}