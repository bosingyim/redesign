/* eslint-disable react/no-array-index-key */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/rules-of-hooks */
import { Chip } from '@nextui-org/react';
import React from 'react';
import { AiFillPicture } from 'react-icons/ai';
import { FaEye, FaHeart, FaInfoCircle, FaLightbulb, FaQuestionCircle } from 'react-icons/fa';
import { IoMdPricetag } from 'react-icons/io';
import { MdComment } from 'react-icons/md';
import { fetcher, formatTimeAgo, formatValue } from 'src/utils/GenericFn';
import useSWR from 'swr';

function RoomData({ room }: any) {
  if (room == null) {
    return <div />;
  }
  const { data } = useSWR(`/api/room/${room}`, fetcher, {
    revalidateOnFocus: true,
  });
  const roomName = data?.nextData?.roomPlainObject?.nameTh || 'กำลังโหลด...';
  const tagHits = data?.nextData?.tagHits || [];
  const topics = data?.nextData?.topics?.data || [];

  return (
    <div>
      <div className="p-4 text-end text-6xl text-zinc-500">{roomName}</div>
      <div className="my-5 mt-3 flex w-full flex-row flex-wrap justify-end gap-2">
        {tagHits?.data?.map((tag: any, index: number) => (
          <a className="" key={tag?.name + index} href={`https://pantip.com/tag/${tag?.name}`} target="_blank"><Chip className="opacity-75  transition-all hover:scale-105 hover:opacity-100" startContent={<IoMdPricetag size={16} />} size="sm">{tag?.name}</Chip></a>
        ))}
      </div>
      {topics.map((topic: any, index: number) => (
        <div key={topic?.topic_id + index} className="my-0.5 flex flex-col rounded-lg bg-white p-1 drop-shadow-md transition-all duration-200 hover:my-1 hover:scale-105 hover:bg-zinc-100">
          <a href={`https://pantip.com/topic/${topic?.topic_id}`} target="_blank" className="flex flex-row items-center gap-1 ">
            <span className="text-zinc-300">{topic?.topic_type == 3 ? <FaQuestionCircle /> : topic?.topic_type == 5 ? <FaInfoCircle /> : <FaLightbulb />}</span>
            {' '}
            {topic?.title}
            {' '}
            {topic?.thumbnail_url && <span className="text-sm text-gray-400"><AiFillPicture /></span>}
          </a>

          <div className="-mt-1 flex w-full flex-row items-center justify-between rounded-xl bg-zinc-100/60 px-2 py-0.5 opacity-60">
            <div className="flex flex-row gap-2">
              <span className="text-xs text-zinc-500 hover:underline">
                <a href={`https://pantip.com${topic?.author?.slug}`} target="_blank">{topic?.author?.name}</a>
              </span>
              <span className="text-xs font-thin text-gray-400">{formatTimeAgo(topic?.created_time)}</span>

            </div>

            <div className="flex flex-row gap-2 text-sm text-zinc-400">
              <div className="flex flex-row items-center gap-1">
                <FaEye />
                {formatValue(Number.parseInt(topic?.views_count) + Number.parseInt(topic?.comments_count), 0)}
              </div>
              <div className="flex flex-row items-center gap-1">
                <MdComment />
                {topic?.comments_count}
              </div>
              <div className="flex flex-row items-center gap-1">
                <FaHeart />
                {topic?.votes_count}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RoomData;
