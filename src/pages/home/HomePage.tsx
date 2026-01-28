import {
  BarChart,
  Binoculars,
  Droplets,
  MapPin,
  Sun,
  Sunrise,
  Wind,
} from 'lucide-react';
import { useEffect, useState } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDate, formatTime } from '@/shared/lib/formatTime';

const HomePage = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-2xl space-y-8">
        {/* 현재 위치의 날씨: 기본 */}
        <div>
          <div className="text-muted-foreground mb-4 flex items-center justify-center gap-2">
            <MapPin className="h-5 w-5" />
            <p>서울 강남구</p>
          </div>

          <div className="mb-4 text-center">
            <p className="mb-3 text-6xl font-bold">22°</p>
            <p className="text-2xl">맑음</p>
          </div>
          <p className="text-muted-foreground mb-1 text-center text-sm">
            체감 온도: 30°
          </p>
          <div className="flex justify-center gap-4">
            <p className="text-sm">최고 온도: 30°</p>
            <p className="text-sm">최저 온도: 24°</p>
          </div>
        </div>

        {/* 현재 위치의 날씨: 상세 */}
        {/* 바람, 습도 / 일출, 일몰 / 등등 */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wind className="h-5 w-5" />
                바람
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-muted-foreground text-sm">풍속</p>
                  <p className="text-lg font-semibold">5 km/h</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-muted-foreground text-sm">풍향</p>
                  <p className="text-lg font-semibold">북동풍</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Droplets className="h-5 w-5" />
                습도
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground text-sm">습도</p>
                <p className="text-lg font-semibold">65%</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sunrise className="h-5 w-5" />
                일출 / 일몰
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-muted-foreground text-sm">일출</p>
                  <p className="text-lg font-semibold">06:00</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-muted-foreground text-sm">일몰</p>
                  <p className="text-lg font-semibold">18:00</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="h-5 w-5" />
                대기압
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-muted-foreground text-sm">대기압</p>
                  <p className="text-lg font-semibold">1013 hPa</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Binoculars className="h-5 w-5" />
                가시거리
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground text-sm">가시거리</p>
                <p className="text-lg font-semibold">10 km</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sun className="h-5 w-5" />
                강수
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground text-sm">강수량</p>
                <p className="text-lg font-semibold">10 mm</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 현재 날짜/시간 */}
        <div className="text-muted-foreground flex w-full justify-center gap-4 text-sm">
          <p>{formatDate(currentTime)}</p>
          <p>{formatTime(currentTime)}</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
