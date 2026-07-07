import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import "@fontsource-variable/geist/index.css"
import "@/index.css"

// Import the generated route tree
import { routeTree } from './routeTree.gen'
import AuthProvider from "@/providers/AuthProvider"
import ThemeProvider from "@/providers/ThemeProvider"

// Create a new router instance
const router = createRouter({ routeTree })


declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Render the app
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <AuthProvider>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </AuthProvider>
    </StrictMode>,
  )
}
