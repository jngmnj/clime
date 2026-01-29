const DIRECTIONS = [
  '북풍',
  '북동풍',
  '동풍',
  '남동풍',
  '남풍',
  '남서풍',
  '서풍',
  '북서풍',
] as const;

export function windDirectionFromDeg(deg: number): string {
  const index = Math.round((((deg % 360) + 360) % 360) / 45) % 8;
  return DIRECTIONS[index];
}
