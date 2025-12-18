import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ThemeProvider } from './components/theme-provider.tsx';
import { Toaster } from 'sonner';
import { Provider } from 'react-redux';
import { store } from '@/store.ts';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/utils/api/query.client.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="m-app-theme">
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <App />
          <Toaster closeButton position="top-center" />
        </QueryClientProvider>
      </Provider>
    </ThemeProvider>
  </StrictMode>
);
