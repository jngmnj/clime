import { Search } from 'lucide-react';
import { Link } from 'react-router';

import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="bg-background/95 supports-backdrop-filter:bg-background/10 sticky top-0 z-50 w-full border-b border-white/10 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link to="/" className="text-xl font-bold text-white">
            Clime
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm">
            <Search className="size-5 text-white" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
