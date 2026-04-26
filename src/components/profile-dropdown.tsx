import { useAuth } from '@/contexts/auth-context'
import { useLogout } from '@/hooks/use-auth'
import { ChevronDown, LogOut, Settings, User } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ConfirmLogout } from './confirm-logout'
import { Avatar } from './ui/avatar'
import { Skeleton } from './ui/skeleton'

export function ProfileDropdown() {
  const { t } = useTranslation()
  const { user, isLoading } = useAuth()
  const { mutate: logout, isPending: isLogoutPending } = useLogout()
  const [isOpen, setIsOpen] = useState(false)
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex cursor-pointer items-center gap-2 rounded-full p-1 transition-all hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        {isLoading ? (
          <Skeleton className="h-9 w-9 rounded-full" />
        ) : (
          <Avatar name={user?.name} photo={user?.photo} size="md" />
        )}
        <div className="hidden text-left md:block">
          {isLoading ? (
            <div className="space-y-1">
              <Skeleton className="h-3.5 w-20" />
              <Skeleton className="h-2.5 w-12" />
            </div>
          ) : (
            <>
              <p className="max-w-[120px] truncate text-sm font-bold text-gray-900 dark:text-gray-100">
                {user?.name}
              </p>
              <p className="text-[10px] font-semibold tracking-wider text-gray-500 uppercase">
                {user?.role?.replace('_', ' ') || 'ADMIN'}
              </p>
            </>
          )}
        </div>
        <ChevronDown
          size={16}
          className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl border border-gray-100 bg-white p-2 shadow-xl dark:border-gray-700 dark:bg-gray-800">
          <div className="mb-1 border-b border-gray-100 px-3 py-2 dark:border-gray-700">
            <p className="truncate text-xs font-semibold tracking-widest text-gray-400 uppercase">
              Account
            </p>
          </div>

          <Link
            to="/dashboard/profile"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700/50 dark:hover:text-gray-100"
            onClick={() => setIsOpen(false)}
          >
            <User size={18} />
            {t('dashboard.navbar.profile')}
          </Link>

          <Link
            to="/dashboard/settings"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700/50 dark:hover:text-gray-100"
            onClick={() => setIsOpen(false)}
          >
            <Settings size={18} />
            {t('dashboard.navbar.settings')}
          </Link>

          <div className="my-1 border-t border-gray-100 dark:border-gray-700" />

          <button
            onClick={() => {
              setIsOpen(false)
              setIsLogoutModalOpen(true)
            }}
            className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-red-500 transition-colors hover:bg-red-50 dark:hover:bg-red-500/10"
          >
            <LogOut size={18} />
            {t('dashboard.sidebar.logout')}
          </button>
        </div>
      )}

      <ConfirmLogout
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={() => logout()}
        isPending={isLogoutPending}
      />
    </div>
  )
}
