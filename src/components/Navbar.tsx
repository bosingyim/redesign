'use client';
import { Input } from '@nextui-org/react';
import Image from 'next/image';
import { useState } from 'react';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { RiFileAddLine } from 'react-icons/ri';

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
      <div className="flex flex-row items-center justify-between">
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
          placeholder="ค้นหาบน Pantip"
          startContent={
            <SearchIcon className="pointer-events-none mb-0.5 shrink-0 text-black/30 dark:text-white/90" />
          }
          value={query}
          onChange={handleInputChange}
        />
        <div className="flex flex-row gap-4 text-base">
          <div className="">
            <RiFileAddLine className="absolute top-2 rotate-12 overflow-hidden text-6xl text-black/10" />
            ตั้งกระทู้
          </div>
          <div>
            <HiOutlineUserGroup className="absolute top-2 rotate-12 overflow-hidden text-6xl text-black/10" />
            คอมมูนิตี้
          </div>
          <div>เข้าสู่ระบบ/สมัครสมาชิก</div>
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
