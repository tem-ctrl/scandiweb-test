import React from 'react'
import { createRoot } from 'react-dom/client'
import AppRoutes from './AppRoutes'
import { QueryClientProvider, QueryClient } from 'react-query'

const container = document.getElementById('root')
const root = createRoot(container)
const queryClient = new QueryClient()

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppRoutes />
    </QueryClientProvider>
  </React.StrictMode>
)
