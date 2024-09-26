/* eslint-disable react-dom/no-missing-button-type */
/* eslint-disable tailwindcss/no-custom-classname */
'use client';
import Image from 'next/image';
import { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keyword: searchQuery, limit: 10, type: 'all', show_btn_search: 'true', room_search: null }),
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
    const newTimeout = setTimeout(() => handleSearch(value), 500);
    setDebounceTimeout(newTimeout);
  };

  return (
    <nav className="animate-float sticky top-0 z-50 bg-white p-4 text-center text-lg text-gray-500 drop-shadow-md [&_a:hover]:text-indigo-500 [&_a]:text-fuchsia-500">
      <div className="flex flex-col items-center justify-between sm:flex-row">
        <Image src="/img/pantip.jpg" alt="pantip logo" className="w-16 p-1" width="100" height="100" />
        <div className="flex w-full max-w-md items-center justify-between rounded-full border-2 border-gray-300 bg-white px-4 py-2 shadow-lg transition-all duration-300 focus-within:border-primary-500 focus-within:shadow-xl">
          <div className="flex items-center space-x-2">
            <SearchIcon className="size-5 text-gray-400 transition-all duration-300" />
            <input
              type="text"
              placeholder="ค้นหา..."
              className="w-80 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none"
              value={query}
              onChange={handleInputChange}
              aria-label="Search"
            />
          </div>
          <button className="ml-2 rounded-full bg-purple-500 p-2 text-sm text-white transition-transform hover:scale-105" aria-label="Search button">
            <FiSearch className="size-4" />
          </button>
        </div>
        <div className="mt-4 flex flex-row gap-4 text-base sm:mt-0">
          <div className="flex items-center">
            <RiChatQuoteLine className="ml-3 size-8" style={{ color: '#9966FF' }} />
            <span className="hidden sm:inline">ตั้งกระทู้</span>
          </div>
          <div className="flex items-center">
            <HiOutlineUserGroup className="ml-3 size-8" style={{ color: '#9966FF' }} />
            <span className="hidden sm:inline">คอมมูนิตี้</span>
          </div>
          <div className="mt-1 flex h-11 flex-row items-center rounded-full border-1 bg-white">
            <HiMenu className="size-10 px-2 text-gray-600" style={{ color: '#9966FF' }} />
            <FaUserCircle className="size-10 px-2 text-gray-600" style={{ color: '#9966FF' }} />
          </div>
        </div>
      </div>

      {loading && <div className="loading-spinner">Loading...</div>}
      {' '}
      {/* Consider adding a spinner here */}
      {!loading && results.length > 0 && (
        <div>
          <ul>
            PANTIP.COM
          </ul>
        </div>
      )}
      <style jsx>
        {`
          @keyframes float {
            0% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0); }
          }
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
        `}
      </style>
    </nav>
  );
};
