import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';
/**
 * tailwind className 상호간에 merge할 때 발생할 수 있는 충돌을 해결하기 위한 함수입니다.
 * @param  inputs className
 * @returns 병합된 className 문자열
 */

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
}

export function cnWithCustom(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// 커스텀 twMerge 함수 생성
const customTwMerge = extendTailwindMerge({
  // 커스텀 클래스 그룹 추가
  extend: {
    classGroups: {
      // 폰트 사이즈 관련 커스텀 클래스들
      'font-size': [
        'text-xxs-regular',
        'text-xs-regular',
        'text-s-regular',
        'text-s-medium',
        'text-m-regular',
        'text-m-medium',
        'text-l-regular',
        'text-l-bold',
        'text-xl-regular',
        'text-xl-bold',
        'text-2xl-regular',
        'text-2xl-bold',
        'text-3xl-regular',
        'text-3xl-bold',
        'text-4xl-regular',
        'text-4xl-bold',
        'text-5xl-regular',
        'text-5xl-bold',
      ],
    },
  },
});

export default cn;
