import { cn } from '@/shared/lib/utils';

type LoadingProps = {
  className?: string;
};

const Loading = ({ className }: LoadingProps) => {
  return (
    <div
      className={cn(
        'flex min-h-screen flex-col items-center justify-center gap-8',
        className,
      )}
      role="status"
      aria-label="로딩 중"
    >
      <div className="relative flex size-16 items-center justify-center">
        <span className="bg-primary/15 absolute inset-0 animate-ping rounded-full" />
        <span className="border-primary/30 border-t-primary absolute size-12 animate-spin rounded-full border-2" />
        <span className="bg-primary size-2.5 rounded-full shadow-[0_0_16px_var(--color-primary)]" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <p className="text-3xl font-bold">clime</p>
        <p className="text-muted-foreground text-sm font-medium">로딩 중</p>
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="bg-primary/70 animation-duration-[0.6s] size-2 animate-bounce rounded-full"
              style={{ animationDelay: `${i * 0.12}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export { Loading };
