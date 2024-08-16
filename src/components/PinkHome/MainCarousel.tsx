"use client";
import React from 'react'
import { dataCarousel } from '../data/dataUser';
import Image from 'next/image';

const MainCarousel = () => {
  return (
    <div className='flex justify-center flex-wrap my-3'>
        {dataCarousel.map((item, index) => {
            return(
                <div 
                style={{ 
                    backgroundColor:'#fff',
                    maxWidth: '350px',
                    paddingTop: '10px'}}

                key={index} className="flex flex-col justify-center items-center border rounded ">
                    <Image className='rounded' 
                    style={{
                        borderRadius:'10px',
                      boxShadow:'0 0 10px rgba(0,0,0,0.5)',
                    }}
                    src={item.imageUrl}  objectFit="contain" width={300} height={300} alt={item.title}/>
                    <div className=" text-black text-center my-3">
                        <h2 className="text-2xl font-bold">{item.title}</h2>
                        <p className="">{item.text}</p>
                    </div>
                </div>
            )
        })}
    </div>
  )
}

export default MainCarousel