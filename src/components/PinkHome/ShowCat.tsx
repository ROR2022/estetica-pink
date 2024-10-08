import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
//importaremos un Spinner de la libreria de tailwindcss para mostrar mientras se carga la imagen

//API_CATS=https://cataas.com/
//******
const basicUrl =
  "https://cataas.com/cat?type=square&filter=mono&fit=contain&position=center&width=300&height=300";
const basicUrl2 = "https://cataas.com/cat";
const ShowCat = () => {
  const [cat, setCat] = useState<any>(null);
  const [catUrl, setCatUrl] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchCat();
  }, []);
  const fetchCat = async () => {
    try {
      setLoading(true);
      const response = await axios.get(basicUrl2, {
        responseType: "blob",
        headers: {
          "Content-Type": "image/jpeg",
          Accept: "image/jpeg",
        },
      });
      const reader = new FileReader();
      
      reader.readAsDataURL(response.data);
      reader.onloadend = () => {
        
        setCat(reader.result);
        setLoading(false);
      };
      //asignaremos la url de la imagen a la variable catUrl
      //setCatUrl(response.request.responseURL);
      const blob = new Blob([response.data], { type: "image/jpeg" });
      const imageUrl = URL.createObjectURL(blob);
      setCatUrl(imageUrl); // Actualiza catBlobUrl con la URL del Blob
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleOpenImageInNewTab = () => {
    //Abrimos la imagen en una nueva pestaña, apartir de los datos de la imagen en la variable cat

    if (catUrl) {
      const link = document.createElement("a");
      link.href = catUrl;
      link.target = "_blank";
      link.click();
      // Liberar la URL después de abrir
      URL.revokeObjectURL(catUrl);
    }
  };
  return (
    <div
      className="flex flex-col items-center justify-center border-2 border-gray-300 rounded-lg p-4 ms-auto me-auto my-5 bg-white"
      style={{ maxWidth: "350px" }}
    >
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-4"
        onClick={fetchCat}
        disabled={loading}
      >
        {loading && (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white-500"></div>
          </div>
        )}

        {!loading && "Quiero un Gato"}
      </button>
      {catUrl && (
        <Image
        onClick={handleOpenImageInNewTab}
          src={catUrl}
          alt="cat"
          width={300}
          height={300}
          style={{ borderRadius: "10%", cursor: "pointer" }}
        />
      )}
    </div>
  );
};

export default ShowCat;
