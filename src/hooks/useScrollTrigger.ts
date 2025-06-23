import { useEffect, useRef, useState } from 'react'

/**
 * 마우스 스크롤을 할 때 특정 요소의 css에 변화를 주기 위한 함수
 * @returns isFixed: fixed 여부 triggerRef: 특정 타겟의 요소를 DOM에서 접근하기 위한 ref
 */
const useScrollTrigger = () => {
  const triggerRef = useRef<HTMLDivElement | null>(null)
  const [isFixed, setIsFixed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (!triggerRef.current) return

      const { bottom } = triggerRef.current.getBoundingClientRect()
      setIsFixed(bottom <= 0)
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return { isFixed, triggerRef }
}

export default useScrollTrigger
