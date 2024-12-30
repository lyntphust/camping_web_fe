"use client";

import { FilterCode, RangeFilter, StringFilter } from "@/types";
import { useEffect, useState } from "react";
import SliderFilter from "./filter/Slider";

interface Props {
  attributeFilters: (StringFilter | RangeFilter)[];
  onFilterChange: (filterValues: Record<string, string>) => void;
  initialFilter?: Record<string, any>;
}

export default function ProductFilter({
  attributeFilters,
  onFilterChange,
  initialFilter: initialFilterValues = {},
}: Props) {
  const [filterValues, setFilterValues] =
    useState<Record<string, string>>(initialFilterValues);

  useEffect(() => {
    onFilterChange(filterValues);
  }, [filterValues, onFilterChange]);

  const stringFilters = attributeFilters.filter(
    (filter) => filter.code !== FilterCode.PRICE
  ) as StringFilter[];

  const rangeFilters = attributeFilters.filter(
    (filter) => filter.code === FilterCode.PRICE
  ) as RangeFilter[];

  const handleRangeInputChange = (values: number[]) => {};

  const handleStringInputChange = (attribute: string, value: string) => {
    let finalFilterValues;

    if (filterValues[attribute]) {
      const prevAttribute = JSON.parse(filterValues[attribute]);

      if (prevAttribute.includes(value)) {
        finalFilterValues = {
          ...filterValues,
          [attribute]: JSON.stringify(
            prevAttribute.filter((v: string) => v !== value)
          ),
        };
      } else {
        finalFilterValues = {
          ...filterValues,
          [attribute]: JSON.stringify([...prevAttribute, value]),
        };
      }
    } else {
      finalFilterValues = {
        ...filterValues,
        [attribute]: JSON.stringify([value]),
      };
    }

    setFilterValues(finalFilterValues);
  };

  return (
    <div>
      {/* {rangeFilters.map((filter) => {
        return (
          <div key={filter.code} className="border-t py-8">
            <p className="font-semibold">{filter.name}</p>
            <SliderFilter
              min={filter.min}
              max={filter.max}
              onChangeComplete={handleRangeInputChange}
            />
          </div>
        );
      })} */}
      {stringFilters.map((filter) => (
        <div key={filter.code} className="border-t py-8">
          <p className="font-semibold">{filter.name}</p>
          <ul className="mt-2">
            {filter.values.map((option) => (
              <li key={`${filter.code}_${option.value}`} className="pt-3">
                <label>
                  <input
                    type="checkbox"
                    name={option.value}
                    value={option.value}
                    onChange={() => {
                      handleStringInputChange(filter.code, option.value);
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
  );
}
