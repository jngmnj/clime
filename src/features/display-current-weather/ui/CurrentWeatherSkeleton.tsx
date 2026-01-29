import { Skeleton } from '@/components/ui/skeleton';

export const CurrentWeatherSkeleton = () => {
  return (
    <div>
      {/* 위치 라인 */}
      <div className="text-muted-foreground mb-4 flex items-center justify-center gap-2">
        <Skeleton className="h-5 w-5 rounded-full" />
        <Skeleton className="h-4 w-32" />
      </div>

      {/* 현재 온도 + 날씨 설명 */}
      <div className="mb-4 flex flex-col items-center">
        <Skeleton className="mb-3 h-16 w-32" />
        <Skeleton className="h-7 w-20" />
      </div>

      {/* 체감 온도 */}
      <div className="mb-1 flex justify-center">
        <Skeleton className="h-4 w-40" />
      </div>

      {/* 최고/최저 온도 */}
      <div className="flex justify-center gap-4">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-4 w-28" />
      </div>
    </div>
  );
};
