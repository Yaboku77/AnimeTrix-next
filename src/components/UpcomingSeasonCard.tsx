import React from 'react';
import Image from 'next/image';

interface Anime {
    id: number;
    image: string;
    title: {
        userPreferred?: string;
        english?: string;
        romaji?: string;
        native?: string;
    };
    countryOfOrigin: string;
    type: string;
    genres: string[];
}

interface UpcomingSeasonCardProps {
    props: Anime[];
    title: string;
}

const UpcomingSeasonCard: React.FC<UpcomingSeasonCardProps> = ({ props, title }) => {
    return (
        <div className='bg-white/10 p-5 h-[700px] overflow-y-scroll w-full rounded-lg'>
            <div className="flex flex-col gap-6">
            <h1 className='text-3xl font-bold capitalize'>{title}</h1>
                {props?.map((anime) => {
                    return (
                        <div className="flex gap-5 items-center" key={anime.id}>
                            <Image src={anime?.image} alt='an image' height={200} width={400} className='w-32 rounded-lg'></Image>
                            <div className="flex gap-3 flex-col">
                                <span className='text-lg'>{anime?.title?.userPreferred || anime?.title?.english || anime?.title?.romaji ||
                                    anime?.title?.native}</span>
                                <div className='flex gap-3 text-sm'>
                                    <span>{anime?.countryOfOrigin}</span>
                                    <span>{anime?.type}</span>
                                </div>
                                <div className="flex gap-2 flex-wrap">
                                    {anime?.genres?.map((genre) => (
                                        <span className='text-sm flex gap-2 items-center' key={genre}>{genre}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default UpcomingSeasonCard;