import { Outlet } from 'react-router';

import Footer from '@/shared/ui/Footer';
import Header from '@/shared/ui/Header';

const GlobalLayout = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default GlobalLayout;
