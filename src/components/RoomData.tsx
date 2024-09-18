import React from 'react';
import useSWR from 'swr';
import { fetcher, formatTimeAgo, formatValue } from 'src/utils/GenericFn'
import { Chip } from '@nextui-org/react';
import { IoMdPricetag } from 'react-icons/io';
import { MdComment } from "react-icons/md";
import { FaQuestionCircle,FaInfoCircle, FaLightbulb,FaEye,FaHeart } from "react-icons/fa";
import { AiFillPicture } from "react-icons/ai";

function RoomData({ room }: any) {

  if(room == null){
    return <div />
  }
  const { data } = useSWR('/api/room/'+ room, fetcher, {
    revalidateOnFocus: true,
  });
  const roomName = data?.nextData?.roomPlainObject?.nameTh || 'กำลังโหลด...'
  const tagHits = data?.nextData?.tagHits || []
  const topics = data?.nextData?.topics?.data || []

  return (
    <div>
      <div className='text-end text-6xl text-zinc-500 p-4'>{roomName}</div>
      <div className='w-full mt-3 flex flex-row flex-wrap my-5 justify-end gap-2'>
              {tagHits?.data?.map((tag: any, index: number) => (
                <a className='' key={tag?.name + index} href={'https://pantip.com/tag/'+tag?.name} target='_blank'><Chip className='opacity-75  hover:opacity-100 hover:scale-105 transition-all' startContent={<IoMdPricetag size={16} />} size="sm">{tag?.name}</Chip></a>
              ))}
      </div> 
      {topics.map((topic: any, index: number) => (
        <div key={topic?.topic_id+index} className='flex flex-col p-1 bg-white drop-shadow-md rounded-lg my-0.5 hover:bg-zinc-100 transition-all duration-200 hover:scale-105 hover:my-1'>
          <a href={`https://pantip.com/topic/${topic?.topic_id}`} target='_blank' className='flex flex-row items-center gap-1 '><span className='text-zinc-300'>{topic?.topic_type == 3?<FaQuestionCircle />: topic?.topic_type == 5 ? <FaInfoCircle />: <FaLightbulb />}</span> {topic?.title} {topic?.thumbnail_url && <span className='text-sm text-gray-400'><AiFillPicture /></span>}</a>
          
          <div className='w-full px-2 py-0.5 -mt-1 flex flex-row justify-between items-center bg-zinc-100/60 opacity-60 rounded-xl'>
                    <div className='flex flex-row gap-2'>
                      <span className='text-xs text-zinc-500 hover:underline'>
                        <a href={'https://pantip.com' + topic?.author?.slug} target='_blank'>{topic?.author?.name}</a>
                      </span>
                      <span className='text-xs font-thin text-gray-400'>{formatTimeAgo(topic?.created_time)}</span>
                      
                    </div>

                    <div className='flex flex-row gap-2 text-zinc-400 text-sm'>
                    <div className='flex flex-row items-center gap-1'><FaEye />{formatValue(parseInt(topic?.views_count)+parseInt(topic?.comments_count), 0)}</div>
                      <div className='flex flex-row items-center gap-1'><MdComment />{topic?.comments_count}</div>
                      <div className='flex flex-row items-center gap-1'><FaHeart />{topic?.votes_count}</div>
                    </div>
                  </div>
        </div>
      ))}
    </div>
  )
}

export default RoomData