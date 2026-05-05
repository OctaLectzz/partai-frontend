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
import Main from '@/pages/main/home'

import Login from '@/pages/auth/login'
import Register from '@/pages/auth/register'

import CouncilMembers from '@/pages/dashboard/council-members'
import CouncilForm from '@/pages/dashboard/council-members/form'
import CouncilDetail from '@/pages/dashboard/council-members/show'
import CouncilReports from '@/pages/dashboard/council-reports'
import CouncilReportForm from '@/pages/dashboard/council-reports/form'
import CouncilReportDetail from '@/pages/dashboard/council-reports/show'
import DistributionMap from '@/pages/dashboard/distribution-map'
import EventManagement from '@/pages/dashboard/event-management'
import EventForm from '@/pages/dashboard/event-management/form'
import EventDetail from '@/pages/dashboard/event-management/show'
import DigitalMembershipCard from '@/pages/dashboard/kta'
import KtaShow from '@/pages/dashboard/kta/show'
import MassData from '@/pages/dashboard/mass-data'
import MassaForm from '@/pages/dashboard/mass-data/form'
import MassaDetail from '@/pages/dashboard/mass-data/show'
import Overview from '@/pages/dashboard/overview'
import QrCheckin from '@/pages/dashboard/qr-checkin'
import QrCheckinScanner from '@/pages/dashboard/qr-checkin/scanner'

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
              { index: true, element: <Overview /> },
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
                path: 'qr-checkin',
                children: [
                  { index: true, element: <QrCheckin /> },
                  { path: ':slug', element: <QrCheckinScanner /> }
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
              },
              {
                path: 'council-members',
                children: [
                  { index: true, element: <CouncilMembers /> },
                  { path: 'create', element: <CouncilForm /> },
                  { path: 'edit/:id', element: <CouncilForm /> },
                  { path: 'show/:id', element: <CouncilDetail /> }
                ]
              },
              {
                path: 'council-activity-reports',
                children: [
                  { index: true, element: <CouncilReports /> },
                  { path: 'create', element: <CouncilReportForm /> },
                  { path: 'edit/:id', element: <CouncilReportForm /> },
                  { path: 'show/:id', element: <CouncilReportDetail /> }
                ]
              },
              {
                path: 'kta',
                children: [
                  { index: true, element: <DigitalMembershipCard /> },
                  { path: 'show/:id', element: <KtaShow /> }
                ]
              },
              {
                path: 'distribution-map',
                element: <DistributionMap />
              }
            ]
          }
        ]
      }
    ]
  }
])
