/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable tailwindcss/no-custom-classname */

/* eslint-disable react/no-array-index-key */
/* eslint-disable react-dom/no-missing-button-type */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

'use client';
import { Skeleton } from '@nextui-org/react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { PiArrowSquareLeftDuotone, PiArrowSquareRightDuotone } from 'react-icons/pi';
import { useDispatch, useSelector } from 'react-redux';
import { fetcher } from 'src/utils/GenericFn';
import useSWR from 'swr';

import { selectRoom } from '@/features/roomSlice';
import type { RootState } from '@/store/store';

export const Rooms = () => {
  const dispatch = useDispatch();
  const selectedRoom = useSelector((state: RootState) => state.room.selectedRoom);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [translateX, setTranslateX] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLUListElement | null>(null);

  const handleSelectRoom = (room: { name: string; name_en: string }) => {
    dispatch(selectRoom(room));
  };

  const { data, isLoading } = useSWR('/api/proxy', fetcher, {
    revalidateOnFocus: true,
  });

  const roomLists: any = data?.nextData?.props?.initialState?.header?.roomLists || [];

  const handleMouseOver = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseOut = () => {
    setHoveredIndex(null);
  };

  const handleScrollLeft = () => {
    if (menuRef.current) {
      const containerWidth = containerRef.current!.offsetWidth;
      let newTranslateX = translateX + containerWidth / 3; // Scroll by 1/3 of container width
      newTranslateX = Math.min(0, newTranslateX);
      setTranslateX(newTranslateX);
    }
  };

  const handleScrollRight = () => {
    if (menuRef.current) {
      const containerWidth = containerRef.current!.offsetWidth;
      const maxTranslate = menuRef.current.scrollWidth - containerWidth;
      let newTranslateX = translateX - containerWidth / 3; // Scroll by 1/3 of container width
      newTranslateX = Math.max(-maxTranslate, newTranslateX);
      setTranslateX(newTranslateX);
    }
  };

  useEffect(() => {
    const handleScrollButtonsVisibility = () => {
      if (menuRef.current && containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const maxTranslate = menuRef.current.scrollWidth - containerWidth;

        // Check if the user can scroll left or right
        setShowLeftButton(translateX < 0); // Show left button if there's scroll space to the left
        setShowRightButton(translateX > -maxTranslate); // Show right button if there's scroll space to the right
      }
    };

    handleScrollButtonsVisibility();
  }, [translateX, roomLists]); // Update visibility whenever translateX or roomLists change

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY === 0);
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
      <div className="relative flex items-center">
        {showLeftButton && (
          <button
            onClick={handleScrollLeft}
            className="left-button absolute left-0 z-10 mt-7 flex size-12 items-center justify-center rounded-full bg-black shadow-xl transition-transform duration-200 ease-in-out hover:scale-105"
          >
            <PiArrowSquareLeftDuotone style={{ color: '#ffffff', fontSize: '2rem' }} />
          </button>
        )}
        <div
          className="relative inline-block px-20 pt-5 transition-transform duration-300"
          style={{ transform: `translateX(${translateX}px)` }}
        >
          <ul className="mb-3 mt-10 flex items-start bg-black/0" ref={menuRef}>
            {isLoading && Array.from({ length: 13 }).map((_, index) => (
              <li key={index * 100} className="mx-4 flex flex-col items-center justify-center gap-2">
                <Skeleton className="size-16 rounded-full" />
                <Skeleton className="mt-2 h-3 w-16 rounded-lg" />
              </li>
            ))}
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
                    item.name_en === selectedRoom?.name_en ? 'scale-125' : 'opacity-70'
                  } cursor-pointer transition-all duration-500 hover:opacity-70`}
                >
                  <Image
                    src={item.room_icon_url}
                    alt={item.name}
                    className={`${
                      item.name_en === selectedRoom?.name_en ? 'border-2' : 'border'
                    } rounded-full p-2`}
                    width={48}
                    height={48}
                    style={{ backgroundColor: '#a633e8' }}
                  />
                  <span className="text-xs text-black">{item.name}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {showRightButton && (
          <button
            onClick={handleScrollRight}
            aria-label="Scroll right"
            className="right-button absolute right-0 z-10 mt-7 flex size-12 items-center justify-center rounded-full bg-black shadow-xl transition-transform duration-200 ease-in-out hover:scale-105"
          >
            <PiArrowSquareRightDuotone style={{ color: '#ffffff', fontSize: '2rem' }} />
          </button>
        )}
      </div>
    </div>
  );
};
