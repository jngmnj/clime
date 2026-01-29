import { Outlet } from 'react-router';

import Footer from '@/shared/ui/Footer';
import Header from '@/shared/ui/Header';

const GlobalLayout = () => {
  return (
    <div className="layout-gradient min-h-screen">
      <Header />
      <main className="mx-auto min-h-[calc(100vh-10rem)]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default GlobalLayout;
