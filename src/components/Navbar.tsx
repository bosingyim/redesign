'use client';
import { Input } from '@nextui-org/react';
import Image from 'next/image';
import { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { HiMenu, HiOutlineUserGroup } from 'react-icons/hi';
import { RiChatQuoteLine } from 'react-icons/ri';

import { SearchIcon } from './SearchIcon';

export const Navbar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery) {
      setResults([]);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          keyword: searchQuery,
          limit: 10,
          type: 'all',
          show_btn_search: 'true',
          room_search: null,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setResults(data.results || []);
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const newTimeout = setTimeout(() => {
      handleSearch(value);
    }, 500); // Adjust the delay time (in ms) as needed
    setDebounceTimeout(newTimeout);
  };

  return (
    <div className="sticky top-0 z-50 bg-white p-4 text-center text-lg text-gray-500 drop-shadow-md [&_a:hover]:text-indigo-500 [&_a]:text-fuchsia-500">
      <div className="flex flex-row items-center justify-between ">
        <Image
          src="/img/logo-mobile-pantip-navy.png"
          alt="pantip logo"
          className="w-16 p-1 opacity-50"
          width="100"
          height="100"

        />
        <Input
          radius="full"
          type="text"
          className="flex max-w-[220px] flex-row items-center rounded-full border-2 bg-white drop-shadow-lg"
          placeholder="ค้นหา..."
          startContent={
            <SearchIcon className="pointer-events-none mb-0.5 shrink-0 text-black/30 dark:text-white/90" />
          }
          value={query}
          onChange={handleInputChange}
        />
        <div className="flex flex-row gap-4 text-base">
          <div>
            <RiChatQuoteLine className="ml-3 size-8 pt-1" style={{ color: '#9966FF' }} />

            ตั้งกระทู้
          </div>
          <div>
            <HiOutlineUserGroup className="ml-3 size-8 pt-1" style={{ color: '#9966FF' }} />
            คอมมูนิตี้
          </div>
          <div className="mt-1 flex  h-11 flex-row items-center rounded-full border-1 bg-white ">
            <HiMenu className="size-10 px-2 text-gray-600" style={{ color: '#9966FF' }} />
            <FaUserCircle className="size-10 px-2 text-gray-600 " style={{ color: '#9966FF' }} />
          </div>

        </div>

      </div>

      {loading && <div>Loading...</div>}
      {!loading && results.length > 0 && (
        <div className="">
          <ul>
            PANTIP.COM
          </ul>
        </div>
      )}
    </div>
  );
};
