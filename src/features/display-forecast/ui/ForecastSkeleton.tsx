import { Skeleton } from '@/components/ui/skeleton';

export const ForecastSkeleton = () => {
  return (
    <div className="space-y-10">
      {/* 제목 + 히어로 카드 */}
      <section>
        <Skeleton className="mb-6 h-8 w-48" />
        <Skeleton className="h-[160px] w-full rounded-2xl" />
      </section>

      {/* 상세 날씨 */}
      <section>
        <Skeleton className="mb-4 h-6 w-24" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-[100px] w-full rounded-xl" />
          ))}
        </div>
      </section>

      {/* 오늘 시간대별 기온 차트 */}
      <section className="rounded-xl border bg-card p-6">
        <Skeleton className="mb-4 h-6 w-40" />
        <Skeleton className="h-[240px] w-full rounded-lg" />
      </section>

      {/* 앞으로 4일 */}
      <section>
        <Skeleton className="mb-4 h-6 w-32" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-[180px] w-full rounded-xl" />
          ))}
        </div>
      </section>
    </div>
  );
};
