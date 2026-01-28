import { MapPin } from 'lucide-react';

const CurrentWeather = () => {
  return (
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
  );
};

export default CurrentWeather;
