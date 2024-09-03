"use client";
import React, { useState, FC } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { createMeme } from "@/api/rorUserApi";
//importaremos de react icons los iconos de tipo de letra, tamaño, color y estilo
import { FaFont, FaTextHeight, FaPalette, FaItalic } from "react-icons/fa";
//import Image from "next/image";

// Listas de opciones
const listFonts = [
  "Arial",
  "Impact",
  "Verdana",
  "Comic Sans MS",
  "Tahoma",
  "Trebuchet MS",
  "Times New Roman",
  "Georgia",
  "Courier New",
  "Brush Script MT",
  "Lucida Console",
  "Lucida Sans Unicode",
  "Lucida Grande",
  "Lucida Sans",
];
const listColors = [
  "white",
  "black",
  "red",
  "blue",
  "green",
  "yellow",
  "purple",
  "orange",
  "pink",
  "brown",
  "gray",
  "cyan",
  "magenta",
];
const listSizes = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
const listStyles = ["normal", "italic", "oblique"];

// Componente MyFormControl
interface IMyFormControl {
  setSelectControl: ({}: any) => void;
  selectControl: any;
  dataMeme: any;
  handleStyleChange: (e: any, field: any) => void;
  icon: any;
  dataSelect: any;
  propSelectControl: any;
}

const MyFormControl: FC<IMyFormControl> = ({
  setSelectControl,
  selectControl,
  dataMeme,
  handleStyleChange,
  icon,
  dataSelect,
  propSelectControl,
}) => {
  return (
    <div className="relative">
      <button
        className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full text-black me-3"
        onClick={() =>
          setSelectControl({
            ...selectControl,
            [propSelectControl]: true,
          })
        }
      >
        {icon}
      </button>
      {selectControl[propSelectControl] && (
        <select
          className="absolute top-12 left-0 bg-white border border-gray-300 rounded shadow-lg p-2 text-black"
          value={dataMeme[propSelectControl]}
          onChange={(e) => {
            handleStyleChange(e, propSelectControl);
            setSelectControl({
              ...selectControl,
              [propSelectControl]: false,
            });
          }}
          onBlur={() =>
            setSelectControl({
              ...selectControl,
              [propSelectControl]: false,
            })
          }
        >
          {dataSelect.map((el: any) => (
            <option key={el} value={el}>
              {el}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

// Configuración de controles
const listTopControls = [
  {
    icon: <FaFont />, // Ícono de fuente
    dataSelect: listFonts,
    propSelectControl: "fontFamilyTopText",
  },
  {
    icon: <FaTextHeight/>, // Ícono de tamaño
    dataSelect: listSizes,
    propSelectControl: "fontSizeTopText",
  },
  {
    icon: <FaPalette/> , // Ícono de color
    dataSelect: listColors,
    propSelectControl: "fontColorTopText",
  },
  {
    icon: <FaItalic/>, // Ícono de estilo (italic)
    dataSelect: listStyles,
    propSelectControl: "fontStyleTopText",
  },
];

const listBottomControls = [
  {
    icon: <FaFont/>, // Ícono de fuente
    dataSelect: listFonts,
    propSelectControl: "fontFamilyBottomText",
  },
  {
    icon: <FaTextHeight/>, // Ícono de tamaño
    dataSelect: listSizes,
    propSelectControl: "fontSizeBottomText",
  },
  {
    icon: <FaPalette/>, // Ícono de color
    dataSelect: listColors,
    propSelectControl: "fontColorBottomText",
  },
  {
    icon: <FaItalic/>, // Ícono de estilo (italic)
    dataSelect: listStyles,
    propSelectControl: "fontStyleBottomText",
  },
];

// Componente principal
const CreateMeme = () => {
  const [dataMeme, setDataMeme] = useState<any>({
    topText: "Top Text",
    bottomText: "Bottom Text",
    image: null,
    fontColorTopText: "white",
    fontSizeTopText: 30,
    fontFamilyTopText: "Arial",
    fontStyleTopText: "normal",
    fontColorBottomText: "white",
    fontSizeBottomText: 30,
    fontFamilyBottomText: "Arial",
    fontStyleBottomText: "normal",
  });
  const [selectControl, setSelectControl] = useState<any>({
    fontFamilyTopText: false,
    fontSizeTopText: false,
    fontColorTopText: false,
    fontStyleTopText: false,
    fontFamilyBottomText: false,
    fontSizeBottomText: false,
    fontColorBottomText: false,
    fontStyleBottomText: false,
  });
  const user = useSelector((state: any) => state.user);
  const router = useRouter();
  const [error, setError] = useState<any>("");

  const handleImageUpload = (e: any) => {
    setDataMeme({
      ...dataMeme,
      image: URL.createObjectURL(e.target.files[0]),
    });
  };

  const handleTextChange = (e: any, position: any) => {
    setDataMeme({
      ...dataMeme,
      [position]: e.target.innerText,
    });
  };

  const handleStyleChange = (e: any, field: any) => {
    setDataMeme({
      ...dataMeme,
      [field]: e.target.value,
    });
  };

  const handleDownloadMeme = () => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const image: any = new Image();
    image.src = dataMeme.image || "";

    image.onload = async () => {
      const ancho = Math.floor((image.width * 512) / image.height);
      const alto = 512;

      canvas.width = ancho;
      canvas.height = alto;
      context?.drawImage(image, 0, 0, ancho, alto);

      context!.font = `${dataMeme.fontStyleTopText} ${dataMeme.fontSizeTopText}px ${dataMeme.fontFamilyTopText}`;
      context!.fillStyle = dataMeme.fontColorTopText;
      context!.textAlign = "center";
      context?.fillText(dataMeme.topText, canvas.width / 2, 50);

      context!.font = `${dataMeme.fontStyleBottomText} ${dataMeme.fontSizeBottomText}px ${dataMeme.fontFamilyBottomText}`;
      context!.fillStyle = dataMeme.fontColorBottomText;
      context?.fillText(
        dataMeme.bottomText,
        canvas.width / 2,
        canvas.height - 50
      );

      const link = document.createElement("a");
      link.download = "meme.png";
      link.href = canvas.toDataURL("image/png");
      link.click();

      canvas.toBlob(
        async (blob) => {
          if (!blob) {
            console.error("Blob conversion failed.");
            return;
          }

          const file = new File([blob], "meme.png", { type: "image/png" });
          const dataMemeAPI = new FormData();
          dataMemeAPI.append("topText", dataMeme.topText);
          dataMemeAPI.append("bottomText", dataMeme.bottomText);
          dataMemeAPI.append("file", file);

          try {
            const result = await createMeme(dataMemeAPI, user.access_token);
            const { _id } = result;
            if (_id) {
              router.push("/");
            } else {
              setError(
                "Error al crear el meme!!!, probablemente la sesion ha expirado, por favor inicia sesion nuevamente"
              );
            }
          } catch (error) {
            console.log("error: ", error);
          }
        },
        "image/png"
      );
    };
  };

  return (
    <div className="max-w-xs mx-auto text-center p-5 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-xl font-bold mb-4">Crea tu Meme!!!</h1>
      <button className="bg-blue-500 text-white py-2 px-4 rounded mb-4">
        <label htmlFor="userImage" className="cursor-pointer">
          Subir Imagen
        </label>
      </button>
      <input
        className="hidden"
        id="userImage"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
      />

      {dataMeme.image && (
        <>
          <div className="flex justify-around mt-4">
            {listTopControls.map((control) => (
              <MyFormControl
                key={control.propSelectControl}
                setSelectControl={setSelectControl}
                selectControl={selectControl}
                dataMeme={dataMeme}
                handleStyleChange={handleStyleChange}
                icon={control.icon}
                dataSelect={control.dataSelect}
                propSelectControl={control.propSelectControl}
              />
            ))}
          </div>

          <div
            className="meme-text text-black font-bold text-center my-2"
            style={{
              fontSize: dataMeme.fontSizeTopText,
              fontFamily: dataMeme.fontFamilyTopText,
              color: dataMeme.fontColorTopText,
              fontStyle: dataMeme.fontStyleTopText,
            }}
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => handleTextChange(e, "topText")}
          >
            {dataMeme.topText}
          </div>

          <img
            src={dataMeme.image}
            alt="Meme"
            className="w-full h-auto border rounded-lg"
          />

          <div
            className="meme-text text-black font-bold text-center my-2"
            style={{
              fontSize: dataMeme.fontSizeBottomText,
              fontFamily: dataMeme.fontFamilyBottomText,
              color: dataMeme.fontColorBottomText,
              fontStyle: dataMeme.fontStyleBottomText,
            }}
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => handleTextChange(e, "bottomText")}
          >
            {dataMeme.bottomText}
          </div>

          <div className="flex justify-around mt-4">
            {listBottomControls.map((control) => (
              <MyFormControl
                key={control.propSelectControl}
                setSelectControl={setSelectControl}
                selectControl={selectControl}
                dataMeme={dataMeme}
                handleStyleChange={handleStyleChange}
                icon={control.icon}
                dataSelect={control.dataSelect}
                propSelectControl={control.propSelectControl}
              />
            ))}
          </div>

          <button
        className="bg-green-500 text-white py-2 px-4 rounded mt-4"
        onClick={handleDownloadMeme}
      >
        Descargar Meme
      </button>
        </>
      )}

      
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default CreateMeme;
