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

// Define TypeScript interfaces
type Tag = {
  name: string;
};

type HitzItem = {
  topic_id: string;
  title: string;
  thumbnail_url?: string;
  author: {
    name: string;
    slug: string;
  };
  created_time: string;
  comments_count: number;
  votes_count: number;
  views_count: number;
  tags: Tag[];
};

type HitzProps = {
  hitzData: HitzItem[];
};

const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};

const Hitz: React.FC<HitzProps> = ({ hitzData }) => {
  const [showAll, setShowAll] = useState(false);
  const itemsToShow = showAll ? hitzData : hitzData.slice(0, 3);

  return (
    <div>
      <div className="grid grid-flow-row grid-cols-1 rounded-xl">
        {itemsToShow.map(item => (
          <div key={item.topic_id} className="col-span-1 m-1 flex flex-col rounded-xl bg-white p-3 drop-shadow-lg">
            <a
              href={`https://pantip.com/topic/${item.topic_id}`}
              target="_blank"
              aria-label={`Read more about ${item.title}`}
              className="text-xl font-semibold text-gray-600"
            >
              {item.thumbnail_url ? truncateText(item.title, 70) : item.title}
            </a>
            <div className="relative mt-4 aspect-square h-56 w-full overflow-hidden rounded-xl border">
              <a href={`https://pantip.com/topic/${item.topic_id}`} target="_blank">
                <Image
                  className="size-full object-cover transition-all duration-500 hover:scale-110"
                  alt={item.title}
                  src={item.thumbnail_url || '/img/pantip-thump.png'}
                  width={300}
                  height={300}
                  onError={(e) => {
                    e.currentTarget.src = '/img/pantip-thump.png'; // fallback image
                  }}
                />
              </a>
              <div className="absolute bottom-0 mt-1 flex w-full flex-row justify-between bg-black/50 px-2 py-1">
                <div className="flex flex-col">
                  <p className="text-xs text-indigo-100 hover:text-amber-500">
                    <a href={`https://pantip.com${item.author.slug}`} target="_blank" aria-label={`View profile of ${item.author.name}`}>
                      {item.author.name}
                    </a>
                  </p>
                  <p className="mt-1 text-xs text-gray-300">{formatTimeAgo(new Date(item.created_time))}</p>
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
            {/* แถบเลื่อนสำหรับแท็ก */}
            <div className="scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-gray-300 mt-3 overflow-x-auto">
              <div className="flex h-12 space-x-1">
                {item.tags.map(tag => (
                  <a
                    key={tag.name}
                    href={`https://pantip.com/tag/${tag.name}`}
                    target="_blank"
                    aria-label={`View tag ${tag.name}`}
                  >
                    <Chip className="opacity-75 transition-all hover:scale-105 hover:opacity-100" startContent={<IoMdPricetag size={16} />} size="sm">
                      {tag.name}
                    </Chip>
                  </a>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Show More / Show Less Button */}
      {hitzData.length > 3 && (
        <div className="mt-4 w-full border text-end">
          <div
            className="flex cursor-pointer items-center justify-center gap-2 rounded px-4 py-2 text-gray-500"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? <FaAngleDoubleUp /> : <FaAngleDoubleDown />}
            {showAll ? 'ดูน้อยลง' : 'ดูเพิ่มเติม'}
          </div>
        </div>
      )}
    </div>
  );
};

export default Hitz;
