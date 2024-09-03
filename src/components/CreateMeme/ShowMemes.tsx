"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { getMemes } from "@/api/rorUserApi";

/**
 * 
 *  <div
         key={index}
         dangerouslySetInnerHTML={{ __html: meme }}
         style={{ overflow:'auto'}}
       />
 */

const ShowMemes = () => {
  const [memes, setMemes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getMemes().then((res) => {
      const tempMemes = res.map((meme: any) => meme.memeURL);
      setMemes(tempMemes);
      setLoading(false);
    });
  }, []);

  return (
    <div className="flex flex-wrap justify-center items-center mt-20 mb-12">
      {loading && (
        <div className="flex justify-center items-center">
          <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        </div>
      )}
      {!loading && memes.map((meme, index) => (
        <Image
          onClick={() => window.open(meme, "_blank")}
          key={index}
          src={meme}
          alt="meme"
          width={300}
          height={300}
          className="m-2 object-contain cursor-pointer"
        />
      ))}
    </div>
  );
};

export default ShowMemes;
