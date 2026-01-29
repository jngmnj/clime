import { SearchIcon, XIcon } from 'lucide-react';
import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

import { Input } from '@/components/ui/input';
import type { NormalizedDistrict } from '@/entities/location';
import { fetchCoordsByKakaoAddress } from '@/entities/weather/api/kakaoAddress';
import { useFilteredDistricts } from '@/features/search-location/model/useDistricts';
import { highlightMatch } from '@/shared/lib/highlightMatch';
import { cn } from '@/shared/lib/utils';

const RESULT_LIST_ID = 'search-location-results';

interface SearchLocationDialogProps {
  open: boolean;
  // eslint-disable-next-line no-unused-vars -- callback type; param is for API contract
  onOpenChange: (value: boolean) => void;
}

const SearchLocation = ({ open, onOpenChange }: SearchLocationDialogProps) => {
  const [query, setQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(50);
  const [isGeocoding, setIsGeocoding] = useState(false);
  const navigate = useNavigate();
  const results = useFilteredDistricts(query);

  const visibleResults =
    results.length > visibleCount ? results.slice(0, visibleCount) : results;

  const handleListScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const bottomReached =
      target.scrollTop + target.clientHeight >= target.scrollHeight - 16;
    if (bottomReached && visibleCount < results.length) {
      setVisibleCount((prev) => Math.min(prev + 50, results.length));
    }
  };

  const handleSelect = useCallback(
    async (district: NormalizedDistrict) => {
      setIsGeocoding(true);
      try {
        // 행정구역 문자열을 공백으로 이어서 Kakao 주소 검색 (예: 서울특별시-종로구-청운동 → 서울특별시 종로구 청운동)
        const addressQuery = district.fullName.replace(/-/g, ' ');
        const coordsList = await fetchCoordsByKakaoAddress(addressQuery);
        if (coordsList.length === 0) {
          toast.error('해당 지역의 날씨 정보를 제공하지 않습니다.');
          return;
        }
        const { lat, lon } = coordsList[0];
        onOpenChange(false);
        setQuery('');
        navigate(`/detail?lat=${lat}&lon=${lon}`);
      } catch {
        toast.error('좌표를 가져오는 데 실패했습니다. 다시 시도해 주세요.');
      } finally {
        setIsGeocoding(false);
      }
    },
    [navigate, onOpenChange],
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (visibleResults.length > 0) {
      handleSelect(visibleResults[0]);
    }
  };

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 h-screen w-full',
        open ? 'block' : 'hidden',
      )}
    >
      <div
        className="absolute inset-0 z-10 cursor-pointer bg-black/50 bg-blend-multiply"
        onClick={() => onOpenChange(false)}
        aria-label="검색 결과 닫기"
      />
      <div className="absolute top-0 right-0 left-0 z-50 h-full bg-white md:h-[50vh]">
        <form
          onSubmit={handleSubmit}
          className="mx-auto h-full max-w-4xl space-y-3 px-4 py-6"
        >
          <div className="relative">
            <h3 className="text-center text-2xl font-bold">
              지역별 날씨를 검색해 보세요!
            </h3>
            <XIcon
              className="absolute top-1/2 right-0 size-6 -translate-y-1/2 cursor-pointer md:size-8"
              onClick={() => onOpenChange(false)}
              aria-label="검색 결과 닫기"
            />
          </div>
          <div className="relative">
            <Input
              type="search"
              placeholder="시·도, 구·군, 동·면 등"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="text-foreground-muted pl-8"
              autoComplete="off"
              aria-controls={RESULT_LIST_ID}
              aria-expanded={results.length > 0}
              aria-autocomplete="list"
            />
            <SearchIcon className="text-foreground-muted absolute top-1/2 left-2 size-4 -translate-y-1/2" />
          </div>
          <div
            id={RESULT_LIST_ID}
            role="listbox"
            onScroll={handleListScroll}
            className={cn(
              'h-[calc(100%-4.5rem)] overflow-y-auto rounded-md border border-white/20 bg-white/10',
              '[&::-webkit-scrollbar]:w-1.5',
              '[&::-webkit-scrollbar-track]:bg-transparent',
              '[&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-black/20',
              '[&::-webkit-scrollbar-thumb:hover]:bg-black/30',
              results.length === 0 && 'hidden',
            )}
          >
            {visibleResults.map((district) => (
              <button
                key={district.fullName}
                type="button"
                role="option"
                className="w-full cursor-pointer px-4 py-2.5 text-left text-sm hover:bg-gray-200/10 focus:bg-gray-200/10 focus:outline-none"
                onClick={() => handleSelect(district)}
                disabled={isGeocoding}
              >
                {highlightMatch(district.fullName.split('-').join(' '), query)}
              </button>
            ))}
          </div>
          {query.trim() && results.length === 0 && (
            <p className="text-center text-sm text-gray-400">
              검색 결과가 없습니다.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default SearchLocation;
