import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * tailwind className 상호간에 merge할 때 발생할 수 있는 충돌을 해결하기 위한 함수입니다.
 * @param  inputs className
 * @returns 병합된 className 문자열
 */

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
