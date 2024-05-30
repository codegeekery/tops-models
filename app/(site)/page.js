'use client'
// import sanity client
import { client } from "@/sanity/lib/client";
// Import Swr
import useSWR from 'swr';
// Import lucide icons
import {
  LoaderPinwheel,
  ServerCrash,
} from 'lucide-react'
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter, FaMeta } from "react-icons/fa6";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';






// sanity fetcher
const query = `*[_type == "gallery"]{
  "imageUrl": image.asset->url,
  "alt": image.alt
}`;

const fetcher = query => client.fetch(query);

export default function Home() {


  // Sanity fetch 
  const { data, error } = useSWR(query, fetcher);

  if (error) return <div className="flex justify-center items-center h-screen"><ServerCrash size={25} /><p className="text-red-500">Error: {error.message}</p></div>
  if (!data) return <div className="flex justify-center items-center h-screen"><LoaderPinwheel className='animate-spin' size={25} /></div>


  return (
    <>


      <div className="relative h-screen p-4 z-10 flex flex-col">
        {/* Video de fondo */}
        {/* <video
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          autoPlay
          loop
          muted
        >
          <source src="Background-video.mp4" type="video/mp4" />
          your browser does not support the video
        </video> */}

        {/* Contenido */}

        



        {/* Texto T O P M O D E L S */}
        <div className="flex flex-col items-center justify-center flex-grow">
          <div className="flex flex-col items-center">
            <h1 className="text-8xl font-bold text-foreground z-30 mb-24">
              <span className="flex gap-8">
                <span className="letter text-xl md:text-6xl lg:text-8xl uppercase ">t</span>
                <span className="letter text-xl md:text-6xl lg:text-8xl uppercase ">o</span>
                <span className="letter text-xl md:text-6xl lg:text-8xl uppercase ">p</span>
                <span className="letter text-xl md:text-6xl lg:text-8xl uppercase "></span>
                <span className="letter text-xl md:text-6xl lg:text-8xl uppercase ">m</span>
                <span className="letter text-xl md:text-6xl lg:text-8xl uppercase ">o</span>
                <span className="letter text-xl md:text-6xl lg:text-8xl uppercase ">d</span>
                <span className="letter text-xl md:text-6xl lg:text-8xl uppercase ">e</span>
                <span className="letter text-xl md:text-6xl lg:text-8xl uppercase ">l</span>
                <span className="letter text-xl md:text-6xl lg:text-8xl uppercase ">s</span>
              </span>
            </h1>
            <div className="relative flex flex-col items-center">
              <p className="text-foreground z-20 text-xl md:text-xl lg:text-3xl uppercase">A collection of films models</p>
              <div className="absolute top-[-78px] z-10">
                <img src="Blutter.png" alt="arrow" className="w-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Socials Media */}

        <div className="flex justify-center items-center gap-4 z-30 mb-4">
          <FaInstagram className="text-foreground text-2xl border border-foreground rounded-full w-[45px] h-[45px] px-2.5 cursor-pointer hover:text-foreground/60" />
          <FaXTwitter size={30} className="text-foreground text-2xl border border-foreground rounded-full w-[45px] h-[45px] px-2.5 cursor-pointer hover:text-foreground/60" />
          <FaMeta size={30} className="text-foreground text-2xl  border border-foreground  rounded-full w-[45px] h-[45px] px-2.5 cursor-pointer hover:text-foreground/60" />
        </div>

        {/* Gallery Slider with slide */}
        <div className='z-30 mt-auto flex container'>
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            pagination={{ type: 'fraction' }}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 20
              }
            }}
            className='cursor-pointer'
          >
            {data.map((item, index) => (
              <SwiperSlide key={index}>
                <img src={item.imageUrl} alt={item.alt} className='rounded-xl w-full h-full' />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {/* fin */}
      </div>
    </>
  );
}
