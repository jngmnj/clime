import { Search } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';

import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import SearchLocation from '@/features/search-location/ui/SearchLocation';

const Header = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 w-full border-b backdrop-blur"
      style={{
        backgroundColor: 'var(--layout-overlay-bg)',
        borderColor: 'var(--layout-overlay-border)',
      }}
    >
      <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="text-xl font-bold"
            style={{ color: 'var(--layout-overlay-fg)' }}
          >
            Clime
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSearchOpen(true)}
            className="cursor-pointer opacity-90 hover:opacity-100"
            style={{ color: 'var(--layout-overlay-fg)' }}
            aria-label="지역 검색"
          >
            <Search
              className="size-5"
              style={{ color: 'var(--layout-overlay-fg)' }}
            />
          </Button>
        </div>
      </div>
      <SearchLocation open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
};

export default Header;
