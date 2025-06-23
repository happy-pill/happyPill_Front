import React from 'react'
import { useTabContext } from './Tabs'
import { cn } from '../../utils/classNames'

interface ItemProps {
  value: string
  children: React.ReactNode
  className?: string
  activeClassName?: string // 해당 탭이 활성화되었을 때, 적용할 className
}

const Item: React.FC<ItemProps> = ({ value, children, className, activeClassName }) => {
  const { selectedTab, setSelectedTab, onTabChange } = useTabContext()
  const isActive = selectedTab === value
  const handleSelectedTab = (value: string) => {
    setSelectedTab(value)
    onTabChange?.(value)
  }
  return (
    <div
      className={cn('cursor-pointer', isActive && activeClassName, className)}
      onClick={() => handleSelectedTab(value)}
    >
      {children}
    </div>
  )
}

export default Item
