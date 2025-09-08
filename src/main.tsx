import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Toaster } from "@/components/ui/sonner"
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './infra/queryClient.ts';

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <StrictMode>
      <App />
      <Toaster />
    </StrictMode>
  </QueryClientProvider>,
);
