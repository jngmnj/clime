export async function fetchCurrentWeather(latitude: number, longitude: number) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${import.meta.env.VITE_OWM_API_KEY}&units=metric&lang=kr`,
  );
  if (!response.ok) {
    throw new Error('현재 날씨 정보를 가져올 수 없습니다.');
  }

  const data = await response.json();
  return data;
}
