import { Route, Routes } from 'react-router';

import DetailPage from '../pages/detail/DetailPage';
import HomePage from '../pages/home/HomePage';

import GlobalLayout from './globalLayout';

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<GlobalLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/detail" element={<DetailPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
