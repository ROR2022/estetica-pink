"use client"
import React, {useEffect} from "react";
import {
  Disclosure,
} from "@headlessui/react";
import {dataLinks} from "@/components/data/dataUser";
// importaremos los iconos de facebook, instagram, y ubicacion de react-icons/fa
import { FaFacebook, FaInstagram, FaMapMarkerAlt, FaTiktok } from "react-icons/fa";

const typedDataLinks:any= dataLinks;
const objIcons:any = {
  facebook: <FaFacebook />,
  instagram: <FaInstagram />,
  ubicacion: <FaMapMarkerAlt />,
  tiktok: <FaTiktok />,
};
const PinkFooter = () => {
  return (
    <Disclosure as="footer" className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between py-2">

          
          <div className="flex flex-1 items-center justify-center ">
            <div className="flex flex-col md:flex-row flex-shrink-0 items-center">
              {/* <h3 className="text-white text-2xl font-bold">Ramiro Ocampo</h3> */}
              {dataLinks.map((item, index) => (
                <a
                  key={item.name}
                  href={item.link}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  <div className="flex  gap-2 items-center">
                  <span>{objIcons[item.icon]}</span>
                  <span>{item.name}</span>
                  </div>
                </a>
              ))}
            
            </div>
          </div>
        </div>
      </div>
    </Disclosure>
  )
}

export default PinkFooter