import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router';

import { Loading } from '@/components/ui/loading';
import GlobalLayout from '@/shared/ui/layouts/globalLayout';

const HomePage = lazy(() => import('@/pages/home/HomePage'));
const DetailPage = lazy(() => import('@/pages/detail/DetailPage'));
const NotFoundPage = lazy(() => import('@/pages/not-found/NotFoundPage'));

const AppRouter = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<GlobalLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/detail" element={<DetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
