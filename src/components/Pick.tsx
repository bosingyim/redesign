import React, { useState } from 'react';
import Image from 'next/image';
import { Chip } from "@nextui-org/react";
import { formatTimeAgo, formatValue } from '@/utils/GenericFn';
import { MdComment } from "react-icons/md";
import { FaHeart, FaEye,FaAngleDoubleUp,FaAngleDoubleDown } from "react-icons/fa";
import { IoMdPricetag } from "react-icons/io";

const truncateText = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  }
  return text;
};

export default function Pick({ pickData }: any) {
  const [showAll, setShowAll] = useState(false);


  const itemsToShow = showAll ? pickData.slice(1, 9) : pickData.slice(1, 6);
  //console.log('pickData:',pickData)
  return (
    <div>

        {itemsToShow.slice(0, 1)?.map((item: any, index: number) => (
          <div key={item?.title+index} className='flex flex-col rounded-xl m-1 p-3 col-span-1 bg-white drop-shadow-lg'>
            <a href={`https://pantip.com/topic/${item?.topic_id}`} target='_blank' className='font-semibold text-xl text-gray-600'>{item?.thumbnail_url ? truncateText(item?.title, 70) : item?.title}</a>
            <div className='relative mt-4  w-full h-56 border rounded-xl overflow-hidden aspect-square'>
            <a href={`https://pantip.com/topic/${item?.topic_id}`} target='_blank'>
              {item?.thumbnail_url ? 
                <Image
                  className='w-full h-full object-cover hover:scale-110 transition-all duration-500'
                  alt={item?.title}
                  src={item?.thumbnail_url}
                  width={768}
                  height={768}
                />
                :
                <Image
                  className='w-full h-full object-cover hover:scale-110 transition-all duration-500'
                  alt={item?.title}
                  src='/img/pantip-thump.png'
                  width={768}
                  height={768}
                />
              }</a>
              <div className='absolute bottom-0 w-full px-2 py-1 mt-1 flex flex-row justify-between bg-black/50'>
                <div className='flex flex-col'>
                  <p className='text-xs text-indigo-100 hover:text-amber-500'>
                    <a href={'https://pantip.com' + item?.author?.slug} target='_blank'>{item?.author?.name}</a>
                  </p>
                  <p className='-mt-1 text-xs text-gray-300'>{formatTimeAgo(item?.created_time)}</p>
                </div>
                <div className='flex flex-row gap-2 text-zinc-200 text-sm'>
                  <div className='flex flex-row items-center gap-1'><MdComment />{item?.comments_count}</div>
                  <div className='flex flex-row items-center gap-1'><FaHeart />{item?.votes_count}</div>
                </div>
              </div>
              <div className='absolute top-0 flex flex-row items-center gap-1 text-sm p-1 px-2 text-white/90 drop-shadow-md'><FaEye />{formatValue(item?.views_count, 0)}</div>
            </div>
            <div className='w-full mt-3 flex flex-row gap-1 overflow-hidden'>
              {item?.tags?.map((tag: any, index: number) => (
                <a key={item?.topic_id + index} href={'https://pantip.com/tag/'+tag?.name} target='_blank'><Chip className='opacity-75  hover:opacity-100 hover:scale-105 transition-all' startContent={<IoMdPricetag size={16} />} size="sm">{tag?.name}</Chip></a>
              ))}
            </div>
          </div>
        ))}

      <div className='rounded-xl grid grid-flow-row grid-cols-2'>
        {itemsToShow.slice(1, 9)?.map((item: any, index: number) => (
          <div key={item?.title+index} className='flex flex-col justify-between rounded-xl m-1 p-3 col-span-1 bg-white drop-shadow-lg'>
            <a href={`https://pantip.com/topic/${item?.topic_id}`} target='_blank' className='w-full font-semibold text-xl text-gray-600'>{item?.thumbnail_url ? truncateText(item?.title, 90) : item?.title}</a>
            <div>
              <div className='flex flex-row gap-2 mt-1'>
                  <div className='w-1/4 relative h-12 border rounded-xl overflow-hidden aspect-square'>
                  <a href={`https://pantip.com/topic/${item?.topic_id}`} target='_blank'>
                    {item?.thumbnail_url ? 
                      <Image
                        className='w-full h-full object-cover hover:scale-110 transition-all duration-500'
                        alt={item?.title}
                        src={item?.thumbnail_url}
                        width={300}
                        height={300}
                      />
                      :
                      <Image
                        className='w-full h-full object-cover hover:scale-110 transition-all duration-500'
                        alt={item?.title}
                        src='/img/pantip-thump.png'
                        width={300}
                        height={300}
                      />
                    }
                    </a>
                    
                  </div>
                  <div className='w-3/4 px-2 py-1 flex flex-row justify-between items-center bg-black/5 rounded-xl'>
                    <div className='flex flex-col'>
                      <p className='text-xs text-zinc-700 hover:text-amber-500'>
                        <a href={'https://pantip.com' + item?.author?.slug} target='_blank'>{item?.author?.name}</a>
                      </p>
                      <p className='-mt-1 text-xs text-gray-400'>{formatTimeAgo(item?.created_time)}</p>
                    </div>

                    <div className='flex flex-row gap-2 text-zinc-400 text-sm'>
                    <div className='flex flex-row items-center gap-1'><FaEye />{formatValue(item?.views_count, 0)}</div>
                      <div className='flex flex-row items-center gap-1'><MdComment />{item?.comments_count}</div>
                      <div className='flex flex-row items-center gap-1'><FaHeart />{item?.votes_count}</div>
                    </div>
                  </div>
              </div>
            
              <div className='w-full mt-3 flex flex-row gap-1 overflow-hidden'>
                {item?.tags?.map((tag: any, index: number) => (
                  <a key={item?.topic_id + index} href={'https://pantip.com/tag/'+tag?.name} target='_blank'><Chip className='opacity-75  hover:opacity-100 hover:scale-105 transition-all' startContent={<IoMdPricetag size={16} />} size="sm">{tag?.name}</Chip></a>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Show More / Show Less Button */}
      {pickData.length > 6 && (
        <div className='border w-full mt-4 text-end'>
          <div 
            className=' px-4 py-2 text-gray-500 rounded cursor-pointer flex justify-center items-center gap-2' 
            onClick={() => setShowAll(!showAll)}
          >
            {showAll?<FaAngleDoubleUp />:<FaAngleDoubleDown />} {showAll ? 'ดูน้อยลง' : 'ดูเพิ่มเติม'}
          </div>
        </div>
      )}
    </div>
  );
}
