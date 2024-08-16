import React,{FC} from 'react'
import Image from 'next/image';

interface CardProps {
    title: string;
    text: string;
    imageUrl?: string;
    link?: string;
  }

const CardCaso:FC<CardProps> = ({title,text,imageUrl,link}) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      {imageUrl && (
        <>
        {/* <img className="w-full h-48 object-cover" src={imageSrc} alt={title} /> */}
        <Image src={imageUrl} alt={title} width={300} height={300}
        className="w-full h-48 object-cover"
         />
        </>
      )}
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-black">{title}</div>
        <p className="text-gray-700 text-base">{text}</p>
      </div>
      {link && (
        <div className="px-6 pt-4 pb-2">
          <a
            href={link}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded inline-block hover:bg-blue-700 transition-colors duration-300"
          >
            Learn More
          </a>
        </div>
      )}
    </div>
  )
}

export default CardCaso