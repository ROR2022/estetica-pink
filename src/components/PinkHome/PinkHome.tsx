"use client";
import React, {useEffect} from "react";
import MainCarousel from "./MainCarousel";
import Casos from "../Casos/Casos";
import Servicios from "../Servicios/Servicios";
import Contacto from "../Contacto/Contacto";
import ShowCat from "./ShowCat";
import Resenas from "../Resenas/Resenas";
import { useSelector } from "react-redux";
import Link from "next/link";
import ShowMemes from "../CreateMeme/ShowMemes";
import InstallButton from "../InstallButton/InstallButton";
import { postDebugMsg } from "@/api/rorUserApi";

const PinkHome = () => {
  const user = useSelector((state: any) => state.user);

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log("user:", user);
    postDebugMsg('+++++ PinkHome Iniciando debug +++++');
  }, []);
  return (
    <div>
      <InstallButton />
      {user && user.email !== "" ? (
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Link href="/create-meme">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
              Crear meme
            </button>
          </Link>
        </div>
      ) : (
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Link href="/signin">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
              Inicia sesión para crear memes
            </button>
          </Link>
        </div>
      )}
      <ShowMemes />

      <ShowCat />
      <Resenas />
      <MainCarousel />

      <Casos />
      <Servicios />
      <Contacto />
    </div>
  );
};

export default PinkHome;
