import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ThemeProvider } from './components/theme-provider.tsx';
import { Toaster } from 'sonner';
import { Provider } from 'react-redux';
import { store } from './store.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="m-app-theme">
      <Provider store={store}>
        <App />
        <Toaster closeButton position="top-center" />
      </Provider>
    </ThemeProvider>
  </StrictMode>
);
