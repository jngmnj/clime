import { Star } from 'lucide-react';

import { useFavorites } from '@/features/favorite-location/model/useFavorites';
import FavoriteCard from '@/features/favorite-location/ui/FavoriteCard';

const FavoriteList = () => {
  const { list } = useFavorites();

  if (list.length === 0) {
    return null;
  }

  return (
    <section className="space-y-4">
      <h2 className="flex items-center gap-2 text-xl font-semibold text-white">
        <Star className="size-5 fill-amber-400 text-amber-400" />
        즐겨찾기
      </h2>
      <ul className="grid gap-3 sm:grid-cols-2">
        {list.map((fav) => (
          <li key={fav.id}>
            <FavoriteCard favorite={fav} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default FavoriteList;
