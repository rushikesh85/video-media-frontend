import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@mui/material/styles'

import theme from '@/theme/theme'
import ErrorBoundary from '@/component/ErrorBoundry'
import StoreProvider from './StoreProvider'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const metadata: Metadata = {
  title: 'Video Media',
  description: 'Video media',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <ErrorBoundary>
          <StoreProvider>
            <ThemeProvider theme={theme}>
              {children}
            </ThemeProvider>
          </StoreProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
