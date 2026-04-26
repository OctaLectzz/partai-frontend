import { Navbar } from '@/components/layouts/dashboard/navbar'
import Sidebar from '@/components/layouts/dashboard/sidebar'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <div className="bg-dashboard dark:bg-dashboard-dark min-h-screen">
      <Sidebar isOpen={isSidebarOpen} />

      <div
        className={`flex flex-col transition-all duration-300 ${isSidebarOpen ? 'ml-72' : 'ml-20'}`}
      >
        <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        <main className="min-h-[calc(100vh-64px)] p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
