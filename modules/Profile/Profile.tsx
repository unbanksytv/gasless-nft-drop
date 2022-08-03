import React, { FC, useState } from 'react'
import { useWallet } from '../../common/useWallet'
import { truncateAddress } from '../../common/utils'
import { Balance } from '../Balance'
import { Button } from '../Button'

interface ProfileProps {
  connectLabel?: string
  disconnectLabel?: string
}

export const Profile: FC<ProfileProps> = ({ connectLabel = 'Connect', disconnectLabel = 'Disconnect' }) => {
  const { address, connect, disconnect } = useWallet()
  const [showDropdown, setShowDropdown] = useState<boolean>(false)

  const showClasses = showDropdown ? 'rotate-180' : ''

  return !address ? (
    <Button label={connectLabel} onClick={connect} />
  ) : (
    <div className="items-end flex flex-col">
      <a
        role="button"
        onClick={() => setShowDropdown(!showDropdown)}
        className="relative flex items-center px-4 py-2 text-base font-semibold transition-all duration-500 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 hover:bg-gray-700"
      >
        {truncateAddress(address)} <span className="pl-1">|</span> <Balance />
        <svg
          className={`w-4 h-4 ml-2 transition-all duration-300 ${showClasses}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </a>
      {showDropdown && (
        <div className="z-10 top-20 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute">
          <ul
            className="py-1 text-base font-semibold text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefault"
          >
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white transition-all duration-300"
              >
                Profile
              </a>
            </li>
            <li>
              <Button onClick={disconnect} label={disconnectLabel} />
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}
