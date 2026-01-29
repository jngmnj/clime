import { useQuery } from '@tanstack/react-query';
import { MapPin, Pencil, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import type { FavoriteLocation } from '@/entities/favorite';
import { getDisplayName } from '@/entities/favorite';
import { fetchCurrentWeather } from '@/entities/weather/api/currentWeather';
import { weatherQueryKey } from '@/entities/weather/model/query';
import { useFavorites } from '@/features/favorite-location/model/useFavorites';
import EditNicknameDialog from '@/features/favorite-location/ui/EditNicknameDialog';
import { formatDegree } from '@/shared/lib/formatDegree';

const OWM_ICON_URL = 'https://openweathermap.org/img/wn';

interface FavoriteCardProps {
  favorite: FavoriteLocation;
}

const FavoriteCard = ({ favorite }: FavoriteCardProps) => {
  const { remove } = useFavorites();
  const [editOpen, setEditOpen] = useState(false);
  const displayName = getDisplayName(favorite);
  const detailUrl = `/detail?lat=${favorite.lat}&lon=${favorite.lon}`;

  const {
    data: weather,
    isPending,
    isError,
  } = useQuery({
    queryKey: weatherQueryKey(favorite.lat, favorite.lon),
    queryFn: () => fetchCurrentWeather(favorite.lat, favorite.lon),
  });

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    remove(favorite.id);
    toast.success('즐겨찾기에서 삭제되었습니다.');
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setEditOpen(true);
  };

  return (
    <>
      <Link to={detailUrl} className="block">
        <Card className="border-white/10 bg-white/10 transition-shadow hover:shadow-lg">
          <CardHeader className="flex flex-row items-start justify-between gap-2 pb-2">
            <CardTitle className="flex min-w-0 items-center gap-2 text-base font-medium text-white">
              <MapPin className="size-4 shrink-0 text-white/80" />
              <span className="truncate">{displayName}</span>
            </CardTitle>
            <div
              className="flex shrink-0 gap-1"
              onClick={(e) => e.preventDefault()}
            >
              <Button
                type="button"
                variant="ghost"
                size="icon-xs"
                className="cursor-pointer text-white/80 hover:bg-white/10 hover:text-white"
                onClick={handleEdit}
                aria-label="별칭 수정"
              >
                <Pencil className="size-3.5" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon-xs"
                className="cursor-pointer text-white/80 hover:bg-white/10 hover:text-white"
                onClick={handleRemove}
                aria-label="즐겨찾기 삭제"
              >
                <Trash2 className="size-3.5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            {isPending && (
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-12 shrink-0 rounded-lg" />
                <div className="flex flex-1 flex-col gap-1">
                  <Skeleton className="h-5 w-14" />
                  <Skeleton className="h-3.5 w-24" />
                </div>
              </div>
            )}
            {isError && (
              <p className="text-sm text-white/80">
                날씨 정보를 불러올 수 없습니다.
              </p>
            )}
            {!isPending && !isError && weather && (
              <div className="flex items-center gap-3">
                <img
                  src={`${OWM_ICON_URL}/${weather.weather[0].icon}@2x.png`}
                  alt={weather.weather[0].description}
                  className="h-10 w-10 shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-2xl font-semibold text-white tabular-nums">
                    {formatDegree(weather.main.temp)}°
                  </p>
                  <p className="truncate text-sm text-white/80 capitalize">
                    {weather.weather[0].description}
                  </p>
                  <p className="mt-0.5 text-xs text-white/80">
                    최고 {formatDegree(weather.main.temp_max)}° · 최저{' '}
                    {formatDegree(weather.main.temp_min)}°
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </Link>
      <EditNicknameDialog
        favorite={favorite}
        open={editOpen}
        onOpenChange={setEditOpen}
      />
    </>
  );
};

export default FavoriteCard;
