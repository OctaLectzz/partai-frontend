// CSS
import '@/index.css'
import 'react-toastify/dist/ReactToastify.css'

// Components
import { Toast } from '@/components/ui/toast'

// Providers
import { AuthProvider } from '@/contexts/auth-context'
import { LocaleProvider } from '@/contexts/locale-context'
import { ThemeProvider } from '@/contexts/theme-context'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Outlet } from 'react-router-dom'

const queryClient = new QueryClient()

export default function AppLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <LocaleProvider>
          <AuthProvider>
            <Toast />

            <Outlet />
          </AuthProvider>
        </LocaleProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
