// src/app/not-found.tsx
import Link from 'next/link'
import Navbar from '@/components/Navbar/Navbar'
import GoBackButton from '@/components/Button/GoBackButton'

export default function NotFound() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="mb-8 text-8xl font-bold text-primary">404</div>
          
          <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
          
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Oops! The page you're looking for doesn't exist or has been moved. 
            Please check the URL or return to the homepage.
          </p>

          <div className="flex space-x-4">
            <Link
              href="/"
              className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors duration-200"
            >
              Return Home
            </Link>
            <GoBackButton />
            
          </div>

          {/* Optional: Add a helpful illustration */}
          <div className="mt-12 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-32 w-32"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
      </main>
    </div>
  )
}