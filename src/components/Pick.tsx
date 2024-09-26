/* eslint-disable react/no-array-index-key */
/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Chip } from '@nextui-org/react';
import Image from 'next/image';
import React, { useState } from 'react';
import { FaAngleDoubleDown, FaAngleDoubleUp, FaEye, FaHeart } from 'react-icons/fa';
import { IoMdPricetag } from 'react-icons/io';
import { MdComment } from 'react-icons/md';

import { formatTimeAgo, formatValue } from '@/utils/GenericFn';

type PickItem = {
  title: string;
  topic_id: string;
  thumbnail_url?: string;
  author?: {
    name: string;
    slug: string;
  };
  created_time: string;
  comments_count: number;
  votes_count: number;
  views_count: number;
  tags: { name: string }[];
};

type PickProps = {
  pickData: PickItem[];
};

const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};

const Pick: React.FC<PickProps> = ({ pickData }) => {
  const [showAll, setShowAll] = useState(false);
  const itemsToShow = showAll ? pickData.slice(1, 9) : pickData.slice(1, 6);

  const renderItem = (item: PickItem, isFirst: boolean) => {
    const createdDate = new Date(item.created_time); // Convert created_time to Date

    return (
      <div key={item.topic_id} className={`col-span-1 m-1 flex flex-col rounded-xl bg-white p-3 drop-shadow-lg ${isFirst ? 'first-item' : ''}`}>
        <a
          href={`https://pantip.com/topic/${item.topic_id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full truncate text-lg font-semibold text-gray-600 md:text-base"
        >
          {item.thumbnail_url ? truncateText(item.title, 70) : item.title}
        </a>
        <div className="relative mt-4 aspect-square h-56 w-full overflow-hidden rounded-xl border md:h-40">
          <a href={`https://pantip.com/topic/${item.topic_id}`} target="_blank" rel="noopener noreferrer">
            <Image
              className="size-full object-cover transition-all duration-500 hover:scale-110"
              alt={item.title}
              src={item.thumbnail_url || '/img/pantip-thump.png'}
              width={768}
              height={768}
            />
          </a>
          <div className="absolute bottom-0 mt-1 flex w-full flex-row justify-between bg-black/50 px-2 py-1">
            <div className="flex flex-col">
              <p className="text-xs text-indigo-100 hover:text-amber-500">
                <a href={`https://pantip.com${item.author?.slug}`} target="_blank" rel="noopener noreferrer">{item.author?.name}</a>
              </p>
              <p className="-mt-1 text-xs text-gray-300">{formatTimeAgo(createdDate)}</p>
              {' '}
              {/* Use createdDate here */}
            </div>
            <div className="flex flex-row gap-2 text-sm text-zinc-200">
              <div className="flex flex-row items-center gap-1">
                <MdComment />
                {item.comments_count}
              </div>
              <div className="flex flex-row items-center gap-1">
                <FaHeart />
                {item.votes_count}
              </div>
            </div>
          </div>
          <div className="absolute top-0 flex flex-row items-center gap-1 p-1 px-2 text-sm text-white/90 drop-shadow-md">
            <FaEye />
            {formatValue(item.views_count, 0)}
          </div>
        </div>
        <div className="mt-3 flex w-full flex-row gap-1">
          {item.tags.length > 0 && (
            <div className="relative h-12 overflow-hidden">
              <div className="scrollbar-thin flex space-x-1 overflow-x-auto">
                {item.tags.map((tag, index) => (
                  <a key={index} href={`https://pantip.com/tag/${tag.name}`} target="_blank" rel="noopener noreferrer">
                    <Chip className="opacity-75 transition-all hover:scale-105 hover:opacity-100" startContent={<IoMdPricetag size={16} />} size="sm">
                      {tag.name}
                    </Chip>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div>
      {itemsToShow.slice(0, 1).map(item => renderItem(item, true))}
      <div className="grid grid-flow-row grid-cols-2 rounded-xl md:grid-cols-1">
        {itemsToShow.slice(1, itemsToShow.length).map(item => renderItem(item, false))}
      </div>
      {/* Show More / Show Less Button */}
      {pickData.length > 6 && (
        <div className="mt-4 w-full border text-end">
          <div
            className="flex cursor-pointer items-center justify-center gap-2 rounded px-4 py-2 text-gray-500"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? <FaAngleDoubleUp /> : <FaAngleDoubleDown />}
            {' '}
            {showAll ? 'ดูน้อยลง' : 'ดูเพิ่มเติม'}
          </div>
        </div>
      )}
    </div>
  );
};

export default Pick;
