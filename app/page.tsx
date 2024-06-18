'use client';

import AppMain from './ui/appMain';
import { MainUiProvider } from './contexts/MainUiContext';
import { AuthProvider } from './contexts/AuthContext';
import { ClientProvider } from './contexts/ClientContext';

export default function Page() {
  return (
    <main className="mainPage">
      <MainUiProvider>
          <AuthProvider>
            <ClientProvider>
              <AppMain></AppMain>
            </ClientProvider>
          </AuthProvider>
        </MainUiProvider>
    </main>
  );
}
