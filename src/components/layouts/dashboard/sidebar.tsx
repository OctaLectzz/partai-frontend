import { ConfirmLogout } from '@/components/confirm-logout'
import { Avatar } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { useAuth } from '@/contexts/auth-context'
import { useLogout } from '@/hooks/use-auth'
import { BarChart3, Calendar, FileText, IdCard, LayoutGrid, LogOut, Map, MessageSquare, QrCode, Share2, UserCheck, Users } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'

interface MenuItem {
  title: string
  path: string
  icon: typeof LayoutGrid
}

interface MenuGroup {
  label: string
  items: MenuItem[]
}

interface SidebarProps {
  isOpen: boolean
}

export default function Sidebar({ isOpen }: SidebarProps) {
  const { t } = useTranslation()
  const { user, isLoading } = useAuth()
  const { mutate: logout, isPending: isLogoutPending } = useLogout()
  const location = useLocation()
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)

  const groups: MenuGroup[] = [
    {
      label: t('dashboard.sidebar.label'),
      items: [
        { title: t('dashboard.sidebar.dashboard'), path: '/dashboard', icon: LayoutGrid },
        { title: t('dashboard.sidebar.events'), path: '/dashboard/events', icon: Calendar },
        { title: t('dashboard.sidebar.massData'), path: '/dashboard/mass-data', icon: Users },
        { title: t('dashboard.sidebar.councilMembers'), path: '/dashboard/council-members', icon: UserCheck }
      ]
    },
    {
      label: t('dashboard.sidebar.operational'),
      items: [
        { title: t('dashboard.sidebar.qrCheckin'), path: '/dashboard/qr-checkin', icon: QrCode },
        {
          title: t('dashboard.sidebar.councilActivityReports'),
          path: '/dashboard/council-activity-reports',
          icon: FileText
        },
        { title: t('dashboard.sidebar.kta'), path: '/dashboard/kta', icon: IdCard },
        { title: t('dashboard.sidebar.whatsAppBlasting'), path: '/dashboard/whatsapp-blasting', icon: MessageSquare }
      ]
    },
    {
      label: t('dashboard.sidebar.landingPage'),
      items: [{ title: t('dashboard.sidebar.socialMedia'), path: '/dashboard/social-media', icon: Share2 }]
    },
    {
      label: t('dashboard.sidebar.analytics'),
      items: [
        { title: t('dashboard.sidebar.analytics'), path: '/dashboard/analytics', icon: BarChart3 },
        { title: t('dashboard.sidebar.distributionMap'), path: '/dashboard/distribution-map', icon: Map }
      ]
    }
  ]

  return (
    <aside
      className={`fixed top-0 left-0 z-50 flex h-screen flex-col border-r border-gray-200 bg-white transition-all duration-300 dark:border-gray-800 dark:bg-gray-900 ${
        isOpen ? 'w-72' : 'w-20'
      }`}
    >
      {/* Header / Logo */}
      <div className={`p-6 transition-all duration-300 ${isOpen ? '' : 'flex justify-center px-4'}`}>
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="border-primary bg-primary/5 flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border-2">
            <img src="/logo.png" alt="Logo" className="h-12 w-12 object-contain" />
          </div>
          {isOpen && (
            <div className="animate-in fade-in slide-in-from-left-2 duration-300">
              <h1 className="text-lg leading-tight font-bold whitespace-nowrap text-gray-900 dark:text-gray-100">
                PARTAI <span className="text-primary-dark font-black">GOLKAR</span>
              </h1>
              <div className="mt-1 inline-flex rounded bg-blue-50 px-2 py-0.5 text-[10px] font-bold tracking-wider text-blue-600 uppercase">
                {user?.role?.replace('_', ' ') || 'ADMIN'}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="scrollbar-custom flex-1 overflow-y-auto px-4 py-2">
        {groups.map((group, groupIdx) => (
          <div key={group.label} className={groupIdx > 0 ? 'mt-6' : ''}>
            {/* Menu Label */}
            <div className={`px-2 py-2 transition-all duration-300 ${isOpen ? '' : 'flex justify-center'}`}>
              {isOpen ? (
                <p className="animate-in fade-in text-[11px] font-bold tracking-widest text-gray-400 uppercase duration-300">{group.label}</p>
              ) : (
                <div className="h-1 w-8 bg-gray-100 dark:bg-gray-800" />
              )}
            </div>

            <ul className="mt-1 space-y-1">
              {group.items.map((item) => {
                const isActive = location.pathname === item.path
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      title={!isOpen ? item.title : ''}
                      className={`group flex cursor-pointer items-center gap-3 rounded-xl py-3 transition-all duration-200 ${
                        isOpen ? 'px-4' : 'justify-center px-0'
                      } ${
                        isActive
                          ? 'bg-primary shadow-primary/40 text-gray-900 shadow-lg'
                          : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100'
                      }`}
                    >
                      <item.icon
                        size={20}
                        className={`shrink-0 ${
                          isActive ? 'text-gray-900' : 'text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-100'
                        }`}
                      />
                      {isOpen && (
                        <span className="animate-in fade-in slide-in-from-left-1 truncate text-sm font-semibold duration-300">{item.title}</span>
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer / User Profile */}
      <div className={`border-t border-gray-100 p-4 transition-all duration-300 dark:border-gray-800 ${isOpen ? '' : 'px-2'}`}>
        <div className={`flex items-center gap-3 py-3 transition-all ${isOpen ? 'px-2' : 'justify-center'}`}>
          {isLoading ? (
            <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
          ) : (
            <Avatar name={user?.name} photo={user?.photo} className="shrink-0" />
          )}

          {isOpen && (
            <div className="animate-in fade-in slide-in-from-left-2 flex-1 overflow-hidden duration-300">
              {isLoading ? (
                <div className="space-y-1.5">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-32" />
                </div>
              ) : (
                <>
                  <p className="truncate text-sm font-bold text-gray-900 dark:text-gray-100">{user?.name || 'Guest'}</p>
                  <p className="truncate text-xs text-gray-500">{user?.email || 'guest@example.com'}</p>
                </>
              )}
            </div>
          )}
        </div>

        <button
          onClick={() => setIsLogoutModalOpen(true)}
          disabled={isLogoutPending}
          title={!isOpen ? t('dashboard.sidebar.logout') : ''}
          className={`mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-red-100 bg-white py-3 text-sm font-bold text-red-600 transition-all hover:bg-red-50 disabled:opacity-50 dark:border-red-900/30 dark:bg-red-900/10 dark:hover:bg-red-900/20 ${
            isOpen ? 'px-4' : 'px-0'
          }`}
        >
          <LogOut size={18} className="shrink-0" />
          {isOpen && <span className="animate-in fade-in slide-in-from-left-1 duration-300">{t('dashboard.sidebar.logout')}</span>}
        </button>
      </div>

      <ConfirmLogout isOpen={isLogoutModalOpen} onClose={() => setIsLogoutModalOpen(false)} onConfirm={() => logout()} isPending={isLogoutPending} />
    </aside>
  )
}
