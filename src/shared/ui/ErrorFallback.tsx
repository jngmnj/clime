import { Button } from '@/components/ui/button';

type ErrorFallbackProps = {
  onReset: () => void;
};

const ErrorFallback = ({ onReset }: ErrorFallbackProps) => {
  return (
    <div className="bg-background flex min-h-screen flex-col items-center justify-center px-4">
      <div className="border-border bg-card flex w-full max-w-md flex-col items-center gap-6 rounded-xl border px-6 py-10 shadow-sm">
        <div className="bg-destructive/10 flex size-12 items-center justify-center rounded-full">
          <span className="text-destructive text-2xl" aria-hidden>
            !
          </span>
        </div>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-foreground text-lg font-semibold">
            문제가 발생했습니다
          </h1>
          <p className="text-muted-foreground text-sm">
            일시적인 오류가 발생했어요. 다시 시도해 주세요.
          </p>
        </div>
        <Button onClick={onReset} size="lg" className="cursor-pointer">
          다시 시도
        </Button>
      </div>
    </div>
  );
};

export { ErrorFallback };
