'use client';
import { useState } from 'react';
import { FaAngleDoubleDown, FaAngleDoubleUp } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { fetcher } from 'src/utils/GenericFn';
import useSWR from 'swr';

import Hitz from '@/components/Hitz';
import Pick from '@/components/Pick';
import Realtime from '@/components/Realtime';
import RoomData from '@/components/RoomData';
import type { RootState } from '@/store/store';

export default function Index() {
  const [showRoom, setShowRoom] = useState(true);
  const selectedRoom = useSelector((state: RootState) => state.room.selectedRoom);
  const { data } = useSWR('/api/proxy', fetcher, {
    revalidateOnFocus: true,
  });

  const pageProps = data?.nextData?.props?.initialProps?.pageProps || {};
  const realtimeData = pageProps?.realtime?.data || [];
  const pickData = pageProps?.pick?.data || [];
  const hitzData = pageProps?.hitz?.data || [];

  return (
    <div className="mt-32 flex w-full justify-center">
      <div className="w-11/12 px-20 md:w-11/12 xl:w-full">
        {selectedRoom && (
          <div className="mt-5 rounded-xl border p-2">
            <div className="flex cursor-pointer flex-row items-center gap-2 text-zinc-500 hover:text-zinc-400" onClick={() => setShowRoom(!showRoom)}>
              {showRoom ? <FaAngleDoubleUp /> : <FaAngleDoubleDown />}
              {' '}
              {showRoom ? 'ซ่อน' : 'แสดง'}
              ห้อง :
              {' '}
              {selectedRoom.name}
            </div>
            {showRoom && <RoomData room={selectedRoom.name_en} /> }
          </div>
        )}
        <div className="my-2 w-full rounded-xl bg-gradient-to-r from-zinc-200/50 to-gray-100/50 p-3">

          <h2 className="text-base font-bold text-zinc-700">
            Pantip Realtime
          </h2>
          <p className="-mt-1 text-xs text-gray-500">กระทู้ที่มีคนเปิดอ่านมากในขณะนี้ อัปเดตทุกนาที</p>
        </div>
        <Realtime realtimeData={realtimeData} />

        <div className="mt-10 flex w-full flex-col md:flex-row">

          <div className="my-2 w-full gap-5 rounded-xl bg-gradient-to-r from-zinc-200/50 to-gray-100/50 p-3 md:mr-4 md:w-3/5">
            <h2 className="text-2xl font-bold text-zinc-700">
              Pantip Pick
            </h2>
            <p className="-mt-1 mb-3 text-base text-gray-500">กระทู้คุณภาพคัดเลือกโดยทีมงาน Pantip</p>
            <Pick pickData={pickData} />
          </div>

          <div className="my-2 w-full rounded-xl bg-gradient-to-r from-zinc-200/50 to-gray-100/50 p-3 md:w-2/5">
            <h2 className="text-2xl font-bold text-zinc-700">
              Pantip Hitz
            </h2>
            <p className="-mt-1 mb-3 text-base text-gray-500">กระทู้ฮิตติดเทรนด์ทุก 10 นาที</p>
            <Hitz hitzData={hitzData} />
          </div>

        </div>

      </div>
    </div>
  );
}
