import { Link } from 'react-router';

import { Button } from '@/components/ui/button';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh]">
      <h1 className="text-7xl font-bold mb-2">404</h1>
      <p className="text-lg mb-8">존재하지 않는 페이지입니다.</p>
      <Button variant="outline" asChild>
        <Link to="/">홈으로 돌아가기</Link>
      </Button>
    </div>
  );
};

export default NotFoundPage;
