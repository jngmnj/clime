import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';

const ThemeToggle = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === 'dark';

  const toggle = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon-sm"
        className="cursor-pointer opacity-90"
        style={{ color: 'var(--layout-overlay-fg)' }}
        aria-hidden
      >
        <span className="size-5" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      onClick={toggle}
      className="cursor-pointer opacity-90 hover:opacity-100"
      style={{ color: 'var(--layout-overlay-fg)' }}
      aria-label={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
    >
      {isDark ? (
        <Sun className="size-5" aria-hidden />
      ) : (
        <Moon className="size-5" aria-hidden />
      )}
    </Button>
  );
};

export { ThemeToggle };
