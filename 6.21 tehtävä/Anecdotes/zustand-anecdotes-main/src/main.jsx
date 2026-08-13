import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import App from './App.jsx'
import { NotificationProvider } from './NotificationContext.jsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
    <NotificationProvider>
    <QueryClientProvider client={queryClient}>
      <App />  
    </QueryClientProvider>
    </NotificationProvider>
    )