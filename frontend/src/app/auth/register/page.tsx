// app/auth/register/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import PatientRegistrationForm from './PatientForm'
import DoctorRegistrationForm from './DoctorForm'

export default function RegisterPage() {
  const [selectedRole, setSelectedRole] = useState<'patient' | 'doctor' | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
          <div className="p-8">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
              <p className="text-gray-600">Select your role to continue</p>
            </div>

            {!selectedRole ? (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  {/* Patient Selection */}
                  <button
                    onClick={() => setSelectedRole('patient')}
                    className="p-6 border-2 border-gray-200 rounded-xl hover:border-blue-500 transition-all"
                  >
                    <div className="space-y-2">
                      <svg className="w-12 h-12 mx-auto text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <h3 className="text-lg font-medium">I'm a Patient</h3>
                      <p className="text-sm text-gray-500">Looking for medical care</p>
                    </div>
                  </button>

                  {/* Doctor Selection */}
                  <button
                    onClick={() => setSelectedRole('doctor')}
                    className="p-6 border-2 border-gray-200 rounded-xl hover:border-blue-500 transition-all"
                  >
                    <div className="space-y-2">
                      <svg className="w-12 h-12 mx-auto text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <h3 className="text-lg font-medium">I'm a Doctor</h3>
                      <p className="text-sm text-gray-500">Provide medical services</p>
                    </div>
                  </button>
                </div>

                <p className="text-center text-gray-600">
                  Already have an account?{' '}
                  <Link href="/auth/login" className="text-blue-600 hover:text-blue-800">
                    Sign in
                  </Link>
                </p>
              </div>
            ) : (
              <div>
                {/* Back Button */}
                <button
                  onClick={() => setSelectedRole(null)}
                  className="mb-6 text-blue-600 hover:text-blue-800 flex items-center"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to role selection
                </button>

                {/* Render Appropriate Form */}
                {selectedRole === 'patient' ? (
                  <PatientRegistrationForm />
                ) : (
                  <DoctorRegistrationForm />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}