import { Suspense } from 'react';

import DetailContent from '@/features/display-current-weather/ui/DetailContent';
import { ForecastSkeleton } from '@/features/display-forecast/ui/ForecastSkeleton';

const DetailPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <Suspense fallback={<ForecastSkeleton />}>
          <DetailContent />
        </Suspense>
      </div>
    </div>
  );
};

export default DetailPage;
