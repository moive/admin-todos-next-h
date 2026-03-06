'use client';

import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// https://tailwindcomponents.com/component/radio-buttons-1

interface Props {
  currentIndex?: number;
  tabOptions?: number[];
}

export const TabBar = ({ tabOptions = [1, 2, 3, 4], currentIndex }: Props) => {
  const router = useRouter();
  const [selected, setSelected] = useState(currentIndex);
  const onTabSelected = (tab: number) => {
    setSelected(tab);
    setCookie('selectedTab', tab.toString());
    router.refresh();
  };

  return (
    <div
      className={`grid w-full gap-2 rounded-xl bg-gray-200 p-2`}
      style={{ gridTemplateColumns: `repeat(${tabOptions.length}, 1fr)` }}
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
