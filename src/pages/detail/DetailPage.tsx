import { Suspense } from 'react';

import DetailContent from '@/features/display-current-weather/ui/DetailContent';
import { ForecastSkeleton } from '@/features/display-forecast/ui/ForecastSkeleton';

const DetailPage = () => {
  return (
    <div className="py-8">
      <div className="mx-auto max-w-4xl px-4">
        <Suspense fallback={<ForecastSkeleton />}>
          <DetailContent />
        </Suspense>
      </div>
    </div>
  );
};

export default DetailPage;
