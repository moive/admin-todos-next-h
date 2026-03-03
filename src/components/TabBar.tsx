'use client';

import { useState } from 'react';

// https://tailwindcomponents.com/component/radio-buttons-1

interface Props {
  currentIndex?: number;
  tabOptions?: number[];
}

export const TabBar = ({ tabOptions = [1, 2, 3, 4], currentIndex }: Props) => {
  const [selected, setSelected] = useState(currentIndex);
  const onTabSelected = (tab: number) => {
    setSelected(tab);
  };

  return (
    <div
      className={`grid grid-cols-${tabOptions.length ?? 1} w-full space-x-2 rounded-xl bg-gray-200 p-2`}
    >
      {tabOptions.map((tab) => (
        <div key={tab}>
          <input
            checked={selected === tab}
            onChange={() => {}}
            type="radio"
            id={tab.toString()}
            className="peer hidden"
          />
          <label
            className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
            onClick={() => onTabSelected(tab)}
          >
            {tab}
          </label>
        </div>
      ))}
    </div>
  );
};
