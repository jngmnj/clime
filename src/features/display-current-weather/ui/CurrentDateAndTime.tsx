import { useEffect, useState } from 'react';

import { formatDate, formatTime } from '@/shared/lib/formatTime';

const CurrentDateAndTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-muted-foreground flex w-full justify-center gap-4 text-sm">
      <p>{formatDate(currentTime)}</p>
      <p>{formatTime(currentTime)}</p>
    </div>
  );
};

export default CurrentDateAndTime;
