import { Search } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';

import { Button } from '@/components/ui/button';
import SearchLocation from '@/features/search-location/ui/SearchLocation';

const Header = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="bg-background/95 supports-backdrop-filter:bg-background/10 sticky top-0 z-50 w-full border-b border-white/10 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link to="/" className="text-xl font-bold text-white">
            Clime
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSearchOpen(true)}
            className="cursor-pointer hover:bg-white/10"
            aria-label="지역 검색"
          >
            <Search className="size-5 text-white" />
          </Button>
        </div>
      </div>
      <SearchLocation open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
};

export default Header;
