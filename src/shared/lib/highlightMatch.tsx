import React from 'react';

export interface HighlightMatchOptions {
  /** <mark>에 적용할 className */
  markClassName?: string;
}

/**
 * 텍스트에서 검색어와 일치하는 부분을 <mark>로 감싸 반환합니다.
 * 대소문자 구분 없이 매칭하며, 정규식 특수문자는 이스케이프합니다.
 */
export function highlightMatch(
  text: string,
  query: string,
  options: HighlightMatchOptions = {},
): React.ReactNode {
  const { markClassName = 'bg-transparent text-primary font-medium' } = options;
  const q = query.trim();
  if (!q) return text;
  const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const parts = text.split(new RegExp(escaped, 'i'));
  if (parts.length === 1) return text;
  return parts.map((part, i) => (
    <React.Fragment key={i}>
      {part}
      {i < parts.length - 1 && <mark className={markClassName}>{q}</mark>}
    </React.Fragment>
  ));
}
