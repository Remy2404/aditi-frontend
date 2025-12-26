"use client"

import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import AccountContent from "@/components/account/AccountContent"

function AccountPageContent() {
  const searchParams = useSearchParams()
  const activeTab = searchParams.get("tab") || "profile"

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 py-8">
        <AccountContent activeTab={activeTab} />
      </main>
      <Footer />
    </div>
  )
}

export default function AccountPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600"></div>
      </div>
    }>
      <AccountPageContent />
    </Suspense>
  )
}
