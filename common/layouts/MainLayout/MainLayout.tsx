import React, { FC, ReactNode } from 'react'
import { Header } from '../../../modules/Header'

interface MainLayoutProps {
  children: ReactNode
}

export const MainLayout: FC<MainLayoutProps> = ({ children }) => (
  <>
    <Header />
    <div className="max-w-screen-2xl mx-auto w-full">{children}</div>
  </>
)
