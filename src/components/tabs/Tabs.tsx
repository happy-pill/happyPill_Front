import React, { createContext, useContext, useState } from 'react'
import type { SetStateAction } from 'react'
import { cn } from '../../utils/classNames'
import List from './List'
import Item from './Item'
import Panel from './Panel'

interface TabsProps {
  children: React.ReactNode
  className?: string
  defaultValue?: string
  onTabChange?: (tabValue: string) => void
}

interface TabsContextProps {
  selectedTab: string
  setSelectedTab: React.Dispatch<SetStateAction<string>>
  onTabChange?: (tabValue: string) => void
}

interface TabCompoundProps {
  List: typeof List
  Item: typeof Item
  Panel: typeof Panel
}

export const TabsContext = createContext<TabsContextProps | null>(null)

/**
 * useTabContext 반드시 탭 컴포넌트 내부에서 사용해야 합니다.
 */
export function useTabContext() {
  const ctx = useContext(TabsContext)

  if (!ctx) throw new Error('TabContext는 부모 트리에서 사용해주세요')
  return ctx
}

const Tabs: React.FC<TabsProps> & TabCompoundProps = ({
  children,
  className,
  defaultValue = '',
  onTabChange,
}) => {
  const [selectedTab, setSelectedTab] = useState(defaultValue)

  const contextValue = { selectedTab, setSelectedTab, onTabChange }

  return (
    <TabsContext.Provider value={contextValue}>
      <div className={cn(className)}>{children}</div>
    </TabsContext.Provider>
  )
}

Tabs.List = List
Tabs.Item = Item
Tabs.Panel = Panel

export default Tabs
