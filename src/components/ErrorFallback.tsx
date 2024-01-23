'use client'

import { Error } from '@/types'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'

interface Props {
  className?: string
  errors?: Error[]
  sectionName?: string
}

export default function ErrorFallback({
  className = '',
  errors = [],
  sectionName = 'undefined',
}: Props) {
  const [show, setShow] = useState(true)

  return (
    <div
      className={`relative z-[1000] bg-white w-full max-w-[1366px] mx-auto py-4 px-[10%] ${className} ${
        show ? 'block' : 'hidden'
      }`}
    >
      <span className="absolute top-0 right-[5%] w-16 h-16 flex items-end justify-end">
        <XMarkIcon
          className="cursor-pointer hover:font-bold"
          width={24}
          height={24}
          onClick={() => setShow(false)}
        />
      </span>
      <p className="italic font-bold py-2 text-red-500">
        Oops, something went wrong while we tried to fetch the data for this
        section. Please try again later.
      </p>
      {errors.length > 0 && (
        <div>
          <p>Component/Page: {sectionName}</p>
          <p>Error logs:</p>
          <ul>
            {errors.map((error, index) => (
              <pre className="rounded" key={index}>
                <li>{JSON.stringify(error, null, 4)}</li>
              </pre>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
