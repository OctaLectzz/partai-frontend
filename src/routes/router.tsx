import { createBrowserRouter } from 'react-router-dom'

// Protected
import ProtectedAuth from './protected-auth'
import ProtectedDashboard from './protected-dashboard'
import ProtectedMain from './protected-main'

// Layouts
import AppLayout from '@/layouts/app-layout'
import AuthLayout from '@/layouts/auth-layout'
import DashboardLayout from '@/layouts/dashboard-layout'
import MainLayout from '@/layouts/main-layout'

// Pages
import Main from '@/pages/main'

import Login from '@/pages/auth/login'
import Register from '@/pages/auth/register'

import Index from '@/pages/dashboard'
import EventManagement from '@/pages/dashboard/event-management'
import EventForm from '@/pages/dashboard/event-management/form'
import EventDetail from '@/pages/dashboard/event-management/show'
import MassData from '@/pages/dashboard/mass-data'
import MassaForm from '@/pages/dashboard/mass-data/form'
import MassaDetail from '@/pages/dashboard/mass-data/show'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '',
        element: <MainLayout />,
        children: [
          {
            path: '',
            element: <ProtectedMain />,
            children: [{ path: '', element: <Main /> }]
          }
        ]
      },

      // Auth
      {
        path: 'auth',
        element: <ProtectedAuth />,
        children: [
          {
            path: '',
            element: <AuthLayout />,
            children: [
              { path: 'login', element: <Login /> },
              { path: 'register', element: <Register /> },
              { index: true, element: <Login /> }
            ]
          }
        ]
      },

      // Dashboard
      {
        path: 'dashboard',
        element: <ProtectedDashboard />,
        children: [
          {
            path: '',
            element: <DashboardLayout />,
            children: [
              { index: true, element: <Index /> },
              {
                path: 'events',
                children: [
                  { index: true, element: <EventManagement /> },
                  { path: 'create', element: <EventForm /> },
                  { path: 'edit/:slug', element: <EventForm /> },
                  { path: 'show/:slug', element: <EventDetail /> }
                ]
              },
              {
                path: 'mass-data',
                children: [
                  { index: true, element: <MassData /> },
                  { path: 'create', element: <MassaForm /> },
                  { path: 'edit/:id', element: <MassaForm /> },
                  { path: 'show/:id', element: <MassaDetail /> }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
])
