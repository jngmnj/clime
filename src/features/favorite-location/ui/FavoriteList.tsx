import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
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
        즐겨찾기
      </h2>

      {/* md 이상, 2개: 카드만 */}
      {list.length <= 2 && (
        <ul className="grid gap-3 sm:grid-cols-2">
          {list.map((fav) => (
            <li key={fav.id}>
              <FavoriteCard favorite={fav} />
            </li>
          ))}
        </ul>
      )}

      {/* md 이상, 3개 이상: 캐러셀 */}
      {list.length > 2 && (
        <div className="relative hidden md:block">
          <Carousel opts={{ align: 'start', loop: false }} className="w-full">
            <CarouselContent className="-ml-4">
              {list.map((fav) => (
                <CarouselItem key={fav.id} className="pl-4 md:basis-1/2">
                  <FavoriteCard favorite={fav} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="cursor-pointer border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white" />
            <CarouselNext className="cursor-pointer border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white" />
          </Carousel>
        </div>
      )}
    </section>
  );
};

export default FavoriteList;
