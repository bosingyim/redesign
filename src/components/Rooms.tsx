/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
'use client';
import { Skeleton } from '@nextui-org/react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetcher } from 'src/utils/GenericFn';
import useSWR from 'swr';

import { selectRoom } from '@/features/roomSlice';
import type { RootState } from '@/store/store';

export const Rooms = () => {
  const dispatch = useDispatch();
  const selectedRoom = useSelector((state: RootState) => state.room.selectedRoom);

  const handleSelectRoom = (room: { name: string; name_en: string }) => {
    dispatch(selectRoom(room));
  };

  const { data, isLoading } = useSWR('/api/proxy', fetcher, {
    revalidateOnFocus: true,
  });

  const roomLists: any = data?.nextData?.props?.initialState?.header?.roomLists || [];

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [translateX, setTranslateX] = useState(0);
  const [isVisible, setIsVisible] = useState(true); // State to control visibility
  const containerRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLUListElement | null>(null);

  const handleMouseOver = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseOut = () => {
    setHoveredIndex(null);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current && menuRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const menuWidth = menuRef.current.scrollWidth;
      const mouseX = e.clientX - containerRef.current.getBoundingClientRect().left;
      const centerX = containerWidth / 2;

      const maxTranslate = menuWidth - containerWidth;
      let moveAmount = -((mouseX - centerX) / centerX) * maxTranslate;

      moveAmount = Math.min(0, moveAmount);
      moveAmount = Math.max(-maxTranslate, moveAmount);

      setTranslateX(moveAmount);
    }
  };

  // Effect to handle the scroll event
  useEffect(() => {
    const handleScroll = () => {
      // Check if the page is at the top
      if (window.scrollY === 0) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed top-0 z-50 mt-16 w-full overflow-visible bg-white text-center transition-transform duration-500 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
      ref={containerRef}
    >
      <div
        className="relative inline-block px-20 pt-5 transition-transform duration-300"
        style={{ transform: `translateX(${translateX}px)` }}
        onMouseMove={handleMouseMove}
      >
        <ul className="mb-3 mt-10 flex items-start bg-black/0" ref={menuRef}>
          {isLoading && (
            Array.from({ length: 13 }).map((_, index) => (
              <li key={index * 100} className="mx-4 flex flex-col items-center justify-center gap-2">
                <Skeleton className="size-16 rounded-full" />
                <Skeleton className="mt-2 h-3 w-16 rounded-lg" />
              </li>
            )))}
          {roomLists?.map((item: any, index: number) => (
            <li
              key={item.name}
              className={`flex w-20 justify-center p-0 transition-all duration-500 hover:mx-5 ${
                hoveredIndex === index
                  ? 'z-10 scale-150'
                  : hoveredIndex === index - 1 || hoveredIndex === index + 1
                    ? 'scale-110'
                    : ''
              }`}
              onMouseOver={() => handleMouseOver(index)}
              onMouseOut={handleMouseOut}
            >
              <div
                onClick={() => handleSelectRoom({ name: item.name, name_en: item.name_en })}
                className={`${
                  item.name_en === selectedRoom?.name_en ? 'scale-125' : 'opacity-30'
                } cursor-pointer transition-all duration-500 hover:opacity-70`}
              >
                <Image
                  src={item.room_icon_url}
                  alt={item.name}
                  className={`${
                    item.name_en === selectedRoom?.name_en ? 'border-2' : 'border'
                  } rounded-full p-2`} // ลด padding
                  width={48} // ขนาดใหม่
                  height={48} // ขนาดใหม่
                  style={{ backgroundColor: '#9966FF' }}
                />
                <span className="text-xs text-black">{item.name}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
