import {
  BarChart3,
  CloudRain,
  Droplets,
  Eye,
  Sunrise,
  Wind,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { CurrentWeatherResponse } from '@/entities/weather/model/types';
import { formatTime } from '@/shared/lib/formatTime';
import { windDirectionFromDeg } from '@/shared/lib/windDirection';

interface CurrentWeatherDetailProps {
  data: CurrentWeatherResponse;
}

const CurrentWeatherDetail = ({ data }: CurrentWeatherDetailProps) => {
  const { main, wind, visibility, sys, rain, snow } = data;
  const rainMm = rain?.['1h'] ?? rain?.['3h'] ?? 0;
  const snowMm = snow?.['1h'] ?? snow?.['3h'] ?? 0;
  const precip = rainMm || snowMm;

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      <Card className="border-card-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Wind className="h-5 w-5" />
            바람
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm">풍속</span>
              <span className="font-semibold">
                {Math.round(wind.speed)} m/s
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm">풍향</span>
              <span className="font-semibold">
                {windDirectionFromDeg(wind.deg)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-card-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Droplets className="h-5 w-5" />
            습도
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm">습도</span>
            <span className="text-lg font-semibold">{main.humidity}%</span>
          </div>
        </CardContent>
      </Card>

      <Card className="border-card-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Sunrise className="h-5 w-5" />
            일출 / 일몰
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm">일출</span>
              <span className="font-semibold">
                {formatTime(new Date(sys.sunrise * 1000))}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm">일몰</span>
              <span className="font-semibold">
                {formatTime(new Date(sys.sunset * 1000))}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-card-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <BarChart3 className="h-5 w-5" />
            대기압
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm">대기압</span>
            <span className="font-semibold">{main.pressure} hPa</span>
          </div>
        </CardContent>
      </Card>

      <Card className="border-card-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Eye className="h-5 w-5" />
            가시거리
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm">가시거리</span>
            <span className="font-semibold">
              {visibility != null
                ? `${(visibility / 1000).toFixed(1)} km`
                : '-'}
            </span>
          </div>
        </CardContent>
      </Card>

      <Card className="border-card-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <CloudRain className="h-5 w-5" />
            강수
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm">강수량</span>
            <span className="font-semibold">
              {precip > 0 ? `${precip} mm` : '0 mm'}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CurrentWeatherDetail;
