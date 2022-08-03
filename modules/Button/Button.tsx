import React, { FC } from 'react'

interface ButtonProps {
  label: string
  onClick: Function
}

export const Button: FC<ButtonProps> = ({ label, onClick }) => (
  <a
    href="#"
    title={label}
    className="inline-flex items-center justify-center px-4 py-2 text-base font-bold leading-tight text-white transition-all duration-300 bg-yellow border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-yellow"
    role="button"
    onClick={() => onClick()}
  >
    {label}
  </a>
)
