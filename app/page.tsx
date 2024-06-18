'use client';

import AppMain from './ui/appMain';
import { MainUiProvider } from './contexts/MainUiContext';

export default function Page() {
  return (
    <main className="mainPage">
      <MainUiProvider>
        <AppMain></AppMain>
      </MainUiProvider>
    </main>
  );
}
