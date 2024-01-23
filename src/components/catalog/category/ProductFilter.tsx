'use client'

import { ProductAggregation } from '@/types'
import { useEffect, useState } from 'react'

interface Props {
  attributeFilters: ProductAggregation[]
  onFilterChange: (filterValues: Record<string, string>) => void
  initialFilter?: Record<string, any>
}

export default function ProductFilter({
  attributeFilters,
  onFilterChange,
  initialFilter: initialFilterValues = {},
}: Props) {
  const [filterValues, setFilterValues] =
    useState<Record<string, string>>(initialFilterValues)

  useEffect(() => {
    onFilterChange(filterValues)
  }, [filterValues, onFilterChange])

  const handleInputChange = (attribute: string, value: string) => {
    let finalFilterValues

    if (filterValues[attribute]) {
      const prevAttribute = JSON.parse(filterValues[attribute])

      if (prevAttribute.includes(value)) {
        finalFilterValues = {
          ...filterValues,
          [attribute]: JSON.stringify(
            prevAttribute.filter((v: string) => v !== value)
          ),
        }
      } else {
        finalFilterValues = {
          ...filterValues,
          [attribute]: JSON.stringify([...prevAttribute, value]),
        }
      }
    } else {
      finalFilterValues = {
        ...filterValues,
        [attribute]: JSON.stringify([value]),
      }
    }

    setFilterValues(finalFilterValues)
  }

  return (
    <div>
      {attributeFilters.map((filter) => (
        <div key={filter.attribute_code} className="border-t py-8">
          <p className="font-semibold">{filter.label}</p>
          <ul className="mt-2">
            {filter.options.map((option) => (
              <li key={option.value} className="pt-3">
                <label>
                  <input
                    type="checkbox"
                    name={option.value}
                    value={option.value}
                    onChange={() => {
                      handleInputChange(filter.attribute_code, option.value)
                    }}
                  />
                  <span className="pl-2">{option.label}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
