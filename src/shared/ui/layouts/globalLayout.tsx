import { Outlet } from 'react-router';

import Footer from '@/shared/ui/Footer';
import Header from '@/shared/ui/Header';

const GlobalLayout = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-[#B2D6FF] via-[#2B7FFF] to-[#2785FF]">
      <Header />
      <main className="mx-auto min-h-[calc(100vh-10rem)]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default GlobalLayout;
