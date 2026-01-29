import { Link } from 'react-router';

import { Button } from '@/components/ui/button';

const NotFoundPage = () => {
  return (
    <div className="flex min-h-[calc(100vh-10rem)] flex-col items-center justify-center px-4">
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-6xl font-bold tracking-tight text-(--layout-overlay-fg) sm:text-7xl">
          404
        </h1>
        <p className="text-center text-base font-medium text-(--layout-overlay-fg)/90 sm:text-lg">
          존재하지 않는 페이지입니다.
        </p>
        <Button variant="secondary" size="lg" asChild className="mt-2">
          <Link to="/">홈으로 돌아가기</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
