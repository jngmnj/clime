import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import App from '@/App.tsx';
import { Toaster } from '@/components/ui/sonner.tsx';
import '@/index.css';
import { queryClient } from '@/shared/config/queryClient.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools />
        <Toaster position="top-center" />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
);
