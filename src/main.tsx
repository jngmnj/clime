import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from 'next-themes';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import App from '@/App.tsx';
import { Toaster } from '@/components/ui/sonner.tsx';
import '@/index.css';
import { queryClient } from '@/shared/config/queryClient.ts';
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary.tsx';
import { ErrorFallback } from '@/shared/ui/ErrorFallback.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <QueryClientProvider client={queryClient}>
          <ErrorBoundary
            fallback={(reset) => <ErrorFallback onReset={reset} />}
          >
            <App />
          </ErrorBoundary>
          {import.meta.env.DEV && <ReactQueryDevtools />}
          <Toaster position="top-center" />
        </QueryClientProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
