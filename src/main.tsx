import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import App from '@/App.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Toaster } from '@/components/ui/sonner.tsx';
import '@/index.css';
import { queryClient } from '@/shared/config/queryClient.ts';
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary
          fallback={(reset) => (
            <div className="flex flex-col items-center gap-2">
              <p>문제가 발생했습니다.</p>
              <Button onClick={reset}>다시 시도</Button>
            </div>
          )}
        >
          <App />
        </ErrorBoundary>
        {import.meta.env.DEV && <ReactQueryDevtools />}
        <Toaster position="top-center" />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
);
