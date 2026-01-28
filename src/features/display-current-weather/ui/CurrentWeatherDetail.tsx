import {
  BarChart,
  Binoculars,
  Droplets,
  Sun,
  Sunrise,
  Wind,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CurrentWeatherDetail = () => {
  return (
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
  );
};

export default CurrentWeatherDetail;
