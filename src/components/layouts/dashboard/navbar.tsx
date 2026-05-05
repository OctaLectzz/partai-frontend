import { LanguageToggle } from '@/components/language-toggle'
import { Menu } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { ProfileDropdown } from '../../profile-dropdown'
import { ThemeToggle } from '../../theme-toggle'

interface NavbarProps {
  toggleSidebar: () => void
}

export function Navbar({ toggleSidebar }: NavbarProps) {
  const { t } = useTranslation()
  const location = useLocation()

  // Map paths to translation keys
  const getPageTitle = () => {
    const path = location.pathname
    if (path === '/dashboard') return t('dashboard.sidebar.dashboard')
    if (path.includes('/events')) return t('dashboard.sidebar.events')
    if (path.includes('/mass-data')) return t('dashboard.sidebar.massData')
    if (path.includes('/council-members')) return t('dashboard.sidebar.councilMembers')
    if (path.includes('/reports')) return t('dashboard.sidebar.reports')
    if (path.includes('/qr-checkin')) return t('dashboard.sidebar.qrCheckin')
    if (path.includes('/council-activity-reports')) return t('dashboard.sidebar.councilActivityReports')
    if (path.includes('/kta')) return t('dashboard.sidebar.kta')
    if (path.includes('/whatsapp-blasting')) return t('dashboard.sidebar.whatsAppBlasting')
    if (path.includes('/distribution-map')) return t('dashboard.sidebar.distributionMap')
    if (path.includes('/profile')) return t('dashboard.navbar.profile')
    if (path.includes('/settings')) return t('dashboard.navbar.settings')
    return 'Dashboard'
  }

  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-gray-100 bg-white/80 px-6 backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/80">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100"
        >
          <Menu size={24} />
        </button>

        <h2 className="text-lg font-bold tracking-tight text-gray-900 dark:text-gray-100">{getPageTitle()}</h2>
      </div>

      <div className="flex items-center gap-4">
        <LanguageToggle />

        <ThemeToggle />

        <div className="h-8 w-1 bg-gray-100 dark:bg-gray-800" />

        <ProfileDropdown />
      </div>
    </header>
  )
}
