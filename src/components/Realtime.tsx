/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Chip } from '@nextui-org/react';
import Image from 'next/image';
import React, { useState } from 'react';
import { FaAngleDoubleDown, FaAngleDoubleUp, FaEye, FaHeart } from 'react-icons/fa';
import { IoMdPricetag } from 'react-icons/io';
import { MdComment } from 'react-icons/md';

import { formatTimeAgo, formatValue } from '@/utils/GenericFn';

const truncateText = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return `${text.slice(0, maxLength)}...`;
  }
  return text;
};

export default function Realtime({ realtimeData }: any) {
  const [showAll, setShowAll] = useState(false);

  // Show only the first 12 items if showAll is false
  const itemsToShow = showAll ? realtimeData : realtimeData.slice(0, 12);

  return (
    <div>
      <div className="grid grid-flow-row grid-cols-1 gap-2 rounded-lg md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6">
        {itemsToShow?.map((item: any, index: number) => (
          <div key={item?.title + index} className="col-span-1 m-1 flex flex-col justify-between rounded-2xl bg-white p-3 drop-shadow-lg">
            <a href={`https://pantip.com/topic/${item?.topic_id}`} target="_blank" className="font-semibold text-gray-600">{item?.thumbnail_url ? truncateText(item?.title, 50) : item?.title}</a>

            <div>
              <div className="relative mt-4 aspect-square h-56 w-full overflow-hidden rounded-xl border">
                <a href={`https://pantip.com/topic/${item?.topic_id}`} target="_blank">
                  {item?.thumbnail_url
                    ? (
                        <Image
                          className="size-full object-cover transition-all duration-500 hover:scale-110"
                          alt={item?.title}
                          src={item?.thumbnail_url}
                          width={300}
                          height={300}
                        />
                      )
                    : (
                        <Image
                          className="size-full object-cover transition-all duration-500 hover:scale-110"
                          alt={item?.title}
                          src="/img/pantip-thump.png"
                          width={300}
                          height={300}
                        />
                      )}
                </a>
                <div className="absolute bottom-0 mt-1 flex w-full flex-row justify-between bg-black/50 px-2 py-1">
                  <div className="flex flex-col">
                    <p className="text-xs text-indigo-100 hover:text-amber-500">
                      <a href={`https://pantip.com${item?.author?.slug}`} target="_blank">{item?.author?.name}</a>
                    </p>
                    <p className="-mt-1 text-xs text-gray-300">{formatTimeAgo(item?.created_time)}</p>
                  </div>
                  <div className="flex flex-row gap-2 text-sm text-zinc-200">
                    <div className="flex flex-row items-center gap-1">
                      <MdComment />
                      {item?.comments_count}
                    </div>
                    <div className="flex flex-row items-center gap-1">
                      <FaHeart />
                      {item?.votes_count}
                    </div>
                  </div>
                </div>
                <div className="absolute top-0 flex flex-row items-center gap-1 p-1 px-2 text-sm text-white/90 drop-shadow-md">
                  <FaEye />
                  {formatValue(item?.views_count, 0)}
                </div>
              </div>
              <div className="mt-3 flex w-full flex-row gap-1 overflow-x-auto">
                {item?.tags.map((tag: any, index: number) => (
                  <a key={item?.topic_id + index} href={`https://pantip.com/tag/${tag?.name}`} target="_blank">
                    <Chip className="opacity-75 transition-all hover:scale-105 hover:opacity-100" startContent={<IoMdPricetag size={16} />} size="sm">
                      {tag?.name}
                    </Chip>
                  </a>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Show More / Show Less Button */}
      {realtimeData.length > 9 && (
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
}
