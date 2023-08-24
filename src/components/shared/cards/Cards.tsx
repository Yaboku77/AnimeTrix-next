"use client"
import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import ReloadFunc from '../../error/ReloadFunc';
import { ArrowBigLeftDash, ArrowBigRightDash } from 'lucide-react';

interface Anime {
  image: string;
  id: number;
  title: {
    userPreferred?: string;
    english?: string;
    romaji?: string;
    native?: string;
  };
  totalEpisodes: number;
  status: string;
}

interface CardsProps {
  props: Anime[];
}

const Cards: React.FC<CardsProps> = ({ props }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef(0);
  const scrollStartX = useRef(0);
  const isDragging = useRef(false);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    isDragging.current = true;
    dragStartX.current = event.clientX;
    scrollStartX.current = containerRef.current!.scrollLeft;
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;

    const dx = event.clientX - dragStartX.current;
    containerRef.current!.scrollLeft = scrollStartX.current - dx;
    event.preventDefault();
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseLeave = () => {
    if (isDragging.current) {
      isDragging.current = false;
    }
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    isDragging.current = true;
    dragStartX.current = event.touches[0].clientX;
    scrollStartX.current = containerRef.current!.scrollLeft;
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;

    const touchDeltaX = event.touches[0].clientX - dragStartX.current;
    const scrollIncrement = touchDeltaX * 2;

    containerRef.current!.scrollLeft = scrollStartX.current - scrollIncrement;
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (containerRef.current?.contains(event.target as Node)) {
        event.preventDefault();
        containerRef.current!.scrollLeft += event.deltaY;
      }
    };

    containerRef?.current?.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      containerRef?.current?.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <div
      className='flex gap-3 overflow-x-hidden duration-200 mt-9'
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ userSelect: isDragging.current ? 'none' : 'auto' }}
    >
      {props.length > 0 ? (
        props.map((anime, index) => (
          <div
            key={anime.id}
            className='flex flex-col relative lg:m-3 m-1 duration-200 rounded-lg cursor-grab'
            onMouseDown={handleMouseDown}
          >
            <Link href={`/details/${anime.id}`} className='content-normal w-full h-full'>
              <div className='relative lg:w-48 w-40 '>
                <img
                  src={anime.image}
                  alt={`an image of ${anime.title.userPreferred || anime.title.english || anime.title.romaji || anime.title.native
                    }`}
                  className='rounded-lg hover:scale-105 duration-200 h-52 lg:h-64 '
                  draggable={false}
                  loading='lazy'
                  height={400}
                  width={200}
                />
              </div>
            </Link>
            <span className='truncate w-32 lg:w-44 p-2 text-sm md:text-xl lg:text-lg capitalize'>
              {anime.title.userPreferred || anime.title.english || anime.title.romaji || anime.title.native?.toLowerCase()}
            </span>
            <div className={`truncate w-32 lg:w-44 p-2 text-sm lg:text-xl pb-5 capitalize flex gap-2 items-center ${anime.totalEpisodes !== null && anime.totalEpisodes !== undefined ? 'green' : 'red'}`}>
              {anime.status === 'Ongoing' && <div className='w-2 lg:w-3 h-2 lg:h-3 rounded-full bg-green-500'></div>}
              <span>Ep: {anime.totalEpisodes || 0}</span>
            </div>
          </div>
        ))
      ) : (
        <ReloadFunc message='Oops!! Something went wrong' />
      )}
    </div>
  );
};

export default Cards;