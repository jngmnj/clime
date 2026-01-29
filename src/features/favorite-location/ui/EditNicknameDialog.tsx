import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import type { FavoriteLocation } from '@/entities/favorite';
import { getDisplayName, NICKNAME_MAX_LENGTH } from '@/entities/favorite';
import { useFavorites } from '@/features/favorite-location/model/useFavorites';

interface EditNicknameDialogProps {
  favorite: FavoriteLocation | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EditNicknameDialog = ({
  favorite,
  open,
  onOpenChange,
}: EditNicknameDialogProps) => {
  const { updateNickname } = useFavorites();
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  const displayName = favorite ? getDisplayName(favorite) : '';

  useEffect(() => {
    queueMicrotask(() => {
      if (open && favorite) {
        setValue(favorite.nickname ?? favorite.regionName ?? '');
        setError(null);
      }
    });
  }, [open, favorite]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!favorite) return;
    const result = updateNickname(favorite.id, value);
    if (result.success) {
      toast.success('별칭이 저장되었습니다.');
      onOpenChange(false);
    } else {
      setError(result.error ?? '저장에 실패했습니다.');
    }
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) setError(null);
    onOpenChange(next);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>별칭 수정</DialogTitle>
          <DialogDescription>
            {displayName !== '이름 없음' ? `"${displayName}"` : '이 장소'}의
            표시 이름을 입력해 주세요. (최대 {NICKNAME_MAX_LENGTH}자)
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="별칭 입력"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                setError(null);
              }}
              maxLength={NICKNAME_MAX_LENGTH + 10}
              aria-invalid={!!error}
              aria-describedby={error ? 'nickname-error' : undefined}
            />
            {error && (
              <p id="nickname-error" className="text-destructive text-sm">
                {error}
              </p>
            )}
            <p className="text-muted-foreground text-xs">
              {value.length} / {NICKNAME_MAX_LENGTH}자
            </p>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
            >
              취소
            </Button>
            <Button type="submit">저장</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditNicknameDialog;
