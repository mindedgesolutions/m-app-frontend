import { Outlet, useNavigate } from 'react-router-dom';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app/sidebar/app-sidebar';
import { AppFooter, AppTopnav } from '@/components';
import { useEffect } from 'react';
import { tokenManager } from '@/utils/auth/token.manager';
import { refreshToken } from '@/utils/auth/auth.api';
import { customFetch } from '@/utils/auth/custom.fetch';
import { showError } from '@/utils/show.error';
import type { Store } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import { setCurrentUser } from '@/features/common.slice';
import AppBodyWrapper from '@/components/app/wrappers/AppBodyWrapper';

function getTokenExpiry(token: string): number {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000;
  } catch {
    return 0;
  }
}

const AppLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    async function handleToken() {
      const token = tokenManager.getToken();

      if (!token) {
        await refreshToken();
        return;
      }

      const exp = getTokenExpiry(token);
      if (Date.now() >= exp) {
        await refreshToken();
      }
    }
    handleToken();
  }, []);

  // -----------------------

  const unauthenticated = async () => {
    try {
      showError('Session expired. Please sign in again.');
      navigate(`/admin/sign-in`);
    } catch (error) {
      console.log(error);
    }
  };

  // -----------------------

  useEffect(() => {
    window.addEventListener('force-logout', unauthenticated);

    return () => {
      window.removeEventListener('force-logout', unauthenticated);
    };
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppTopnav />
        <AppBodyWrapper>
          <Outlet />
        </AppBodyWrapper>
        <AppFooter />
      </SidebarInset>
    </SidebarProvider>
  );
};
export default AppLayout;

// -----------------------

export const loader = (store: Store<RootState>) => async () => {
  const { currentUser } = store.getState().common;
  if (!currentUser) {
    try {
      const response = await customFetch.get(`/auth/me`);
      const user = response.data.data;
      store.dispatch(setCurrentUser(user));
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  return null;
};
