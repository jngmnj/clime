import { Star } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { FAVORITES_MAX_COUNT } from '@/entities/favorite';
import { useFavorites } from '@/features/favorite-location/model/useFavorites';
import { cn } from '@/shared/lib/utils';

interface FavoriteActionButtonProps {
  lat: number;
  lon: number;
  regionName: string | null;
  className?: string;
}

const FavoriteActionButton = ({
  lat,
  lon,
  regionName,
  className,
}: FavoriteActionButtonProps) => {
  const { isFavorite, add, remove, getFavoriteByCoords, list } = useFavorites();
  const isInFavorites = isFavorite(lat, lon);
  const favorite = getFavoriteByCoords(lat, lon);
  const canAdd = list.length < FAVORITES_MAX_COUNT;

  const handleClick = () => {
    if (isInFavorites && favorite) {
      remove(favorite.id);
      toast.success('즐겨찾기에서 삭제되었습니다.');
    } else {
      if (!canAdd) {
        toast.error(
          `즐겨찾기는 최대 ${FAVORITES_MAX_COUNT}개까지 등록할 수 있습니다.`,
        );
        return;
      }
      const ok = add(lat, lon, regionName);
      if (ok) {
        toast.success('즐겨찾기에 추가되었습니다.');
      } else {
        toast.error('이미 즐겨찾기에 등록된 장소입니다.');
      }
    }
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className={cn('cursor-pointer hover:bg-white/10', className)}
      onClick={handleClick}
      aria-label={isInFavorites ? '즐겨찾기에서 삭제' : '즐겨찾기에 추가'}
    >
      <Star
        className={`size-5 shrink-0 ${isInFavorites ? 'fill-amber-400 text-amber-400' : 'text-white/80'}`}
      />
    </Button>
  );
};

export default FavoriteActionButton;
