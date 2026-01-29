import { MapPin, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { FavoriteLocation } from '@/entities/favorite';
import { getDisplayName } from '@/entities/favorite';
import { useFavorites } from '@/features/favorite-location/model/useFavorites';
import EditNicknameDialog from '@/features/favorite-location/ui/EditNicknameDialog';

interface FavoriteCardProps {
  favorite: FavoriteLocation;
}

const FavoriteCard = ({ favorite }: FavoriteCardProps) => {
  const { remove } = useFavorites();
  const [editOpen, setEditOpen] = useState(false);
  const displayName = getDisplayName(favorite);
  const detailUrl = `/detail?lat=${favorite.lat}&lon=${favorite.lon}`;

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
            <CardTitle className="flex items-center gap-2 text-base font-medium text-white">
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
                className="text-white/80 hover:bg-white/10 hover:text-white"
                onClick={handleEdit}
                aria-label="별칭 수정"
              >
                <Pencil className="size-3.5" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon-xs"
                className="text-white/80 hover:bg-white/10 hover:text-white"
                onClick={handleRemove}
                aria-label="즐겨찾기 삭제"
              >
                <Trash2 className="size-3.5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-sm text-white/80">날씨 보기 →</p>
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
