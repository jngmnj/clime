export async function fetchCurrentWeather(latitude: number, longitude: number) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${import.meta.env.VITE_OWM_API_KEY}&units=metric&lang=kr`,
  );

  if (response.status === 404) {
    throw new Error('해당 지역의 날씨 정보를 제공하지 않습니다.');
  }
  if (!response.ok) {
    throw new Error('현재 날씨 정보를 가져올 수 없습니다.');
  }

  const data = await response.json();
  if (
    data?.cod === '404' ||
    data?.message?.toLowerCase().includes('not found')
  ) {
    throw new Error('해당 지역의 날씨 정보를 제공하지 않습니다.');
  }
  return data;
}
