// src/components/Button/GoBackButton.tsx
'use client'

export default function GoBackButton() {
  return (
    <button
      onClick={() => window.history.back()}
      className="border border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary/10 transition-colors duration-200"
    >
      Go Back
    </button>
  )
}