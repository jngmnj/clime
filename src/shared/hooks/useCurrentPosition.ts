import { useEffect, useState } from 'react';

interface Location {
  latitude: number;
  longitude: number;
}

interface GeolocationError {
  code: number;
  message: string;
}

interface UseCurrentPositionReturn {
  location: Location | null;
  error: GeolocationError | null;
  isLoading: boolean;
}

export const useCurrentPosition = (): UseCurrentPositionReturn => {
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<
    GeolocationPositionError | { code: number; message: string } | null
  >(
    typeof window !== 'undefined' && !navigator.geolocation
      ? { code: -1, message: '브라우저에서 위치 정보를 가져올 수 없습니다' }
      : null,
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const { geolocation } = navigator;

    if (!geolocation) {
      return;
    }

    const handleSuccess = (pos: GeolocationPosition) => {
      const { latitude, longitude } = pos.coords;
      setLocation({ latitude, longitude });
      setError(null);
      setIsLoading(false);
    };

    const handleError = (err: GeolocationPositionError) => {
      setError({
        code: err.code,
        message: err.message,
      });
      setIsLoading(false);
    };

    geolocation.getCurrentPosition(handleSuccess, handleError);
  }, []);

  return { location, error, isLoading };
};
