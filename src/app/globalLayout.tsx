import { Outlet } from 'react-router';

const GlobalLayout = () => {
  return (
    <div className="min-h-screen">
      <main className="mx-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default GlobalLayout;
