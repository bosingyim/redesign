import Image from 'next/image';
import { AiFillTikTok } from 'react-icons/ai';
import { FaFacebook, FaInstagramSquare, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

export const Footer = () => (

  <footer className="w-full overflow-hidden border-0 bg-gradient-to-tr from-[#f7f7f7] to-zinc-50 pb-6 pt-0 font-normal text-[#222]">
    <Image
      src="/img/valley-white.svg"
      alt="valley white"
      className="w-full border-0 p-0 drop-shadow-lg"
      width="100"
      height="100"
    />
    <div className="container mx-auto grid grid-cols-1 gap-8 px-4 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">

      <div>

      </div>

      <div>

        <ul className="space-y-2 text-sm">
          <li>
            <a
              href="#about-section"
              className="hover:text-indigo-500 transition duration-300"
            >
              ติดต่อทีมงาน Pantip
            </a>
          </li>
          <li>
            <a
              href="#about-section"
              className="hover:text-indigo-500 transition duration-300"
            >
              ติดต่อลงโฆษณา
            </a>
          </li>
          <li>
            <a
              href="#about-section"
              className="hover:text-indigo-500 transition duration-300"
            >
              ร่วมงานกับ Pantip
            </a>
          </li>

        </ul>
      </div>

      <div>

        <ul className="space-y-2 text-sm">
          <li>
            <a
              href="#about-section"
              className="hover:text-indigo-500 transition duration-300"
            >
              กฎ กติกาและมารยาท
            </a>
          </li>
          <li>
            <a
              href="#about-section"
              className="hover:text-indigo-500 transition duration-300"
            >
              คำแนะนำการโพสต์
            </a>
          </li>
          <li>
            <a
              href="#about-section"
              className="hover:text-indigo-500 transition duration-300"
            >
              นโยบายเกี่ยวกับข้อมูลส่วนบุคคล
            </a>
          </li>
          <li>
            <a
              href="#about-section"
              className="hover:text-indigo-500 transition duration-300"
            >
              สิทธิ์การใช้งานของสมาชิก
            </a>
          </li>
          <li>
            <a
              href="#about-section"
              className="hover:text-indigo-500 transition duration-300"
            >
              Download App Pantip
            </a>
          </li>
          <li>
            <a
              href="#about-section"
              className="hover:text-indigo-500 transition duration-300"
            >
              Pantip Certified Developer
            </a>
          </li>

        </ul>
      </div>

      <div>
        <h2 className="mb-2 text-xl font-semibold">
          ติดตาม
        </h2>

        <div className="mt-3 flex space-x-4">
          <a
            href="https://www.facebook.com/pantipdotcom/"
            className=" rounded-full p-2 transition duration-300 hover:bg-black/20"
          >
            <FaFacebook className="size-6" />
          </a>
          <a
            href="https://x.com/Pantip1996"
            className=" rounded-full p-2 transition duration-300 hover:bg-black/20"
          >
            <FaXTwitter className="size-6" />
          </a>
          <a
            href="https://www.youtube.com/@pantipchannel"
            className=" rounded-full p-2 transition duration-300 hover:bg-black/20"
          >
            <FaYoutube className="size-6" />
          </a>
          <a
            href="https://www.instagram.com/pantipdotcom"
            className=" rounded-full p-2 transition duration-300 hover:bg-black/20"
          >
            <FaInstagramSquare className="size-6" />
          </a>

          <a
            href="https://www.tiktok.com/@pantip1996"
            className=" rounded-full p-2 transition duration-300 hover:bg-black/20"
          >
            <AiFillTikTok className="size-6" />
          </a>
        </div>
      </div>
    </div>
    <div className="container mx-auto mt-8 px-4 pt-10 text-center text-sm lg:px-8">
      © 2024 Internet Marketing co., ltd
    </div>
  </footer>
);
