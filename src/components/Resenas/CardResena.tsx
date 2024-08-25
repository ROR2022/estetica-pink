import React,{FC} from 'react';
import Image from 'next/image';
//importamos el icono de usuario de react-icons
import { FaUser } from 'react-icons/fa';


interface CardResenaProps {
    dataResena:{
    name: string;
    resena: string;
    stars: number;
    avatarUrl: string;
    }
    }

const CardResena:FC<CardResenaProps> = ({ dataResena }) => {
    const { name, resena, stars, avatarUrl } = dataResena;
  // Crear un array de estrellas basado en la calificación
  const starElements = Array.from({ length: 5 }, (_, i) => (
    <svg
      key={i}
      className={`w-5 h-5 ${i < stars ? 'text-yellow-500' : 'text-gray-300'}`}
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.185c.969 0 1.371 1.24.588 1.81l-3.39 2.46a1 1 0 00-.364 1.118l1.286 3.97c.3.921-.755 1.688-1.538 1.118l-3.39-2.46a1 1 0 00-1.175 0l-3.39 2.46c-.783.57-1.838-.197-1.538-1.118l1.286-3.97a1 1 0 00-.364-1.118L2.195 9.397c-.783-.57-.381-1.81.588-1.81h4.185a1 1 0 00.95-.69l1.286-3.97z" />
    </svg>
  ));

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto mb-6">
      <div className="flex items-center mb-4">
        <div className="text-lg font-semibold text-black flex justify-center align-center gap-2">
          {avatarUrl ? (
            <Image src={avatarUrl} alt={name} width={40} height={40} className="rounded-full" />
          ) : (
            <FaUser className="w-10 h-10" />
          )
            }
            
            <span>{name}</span>
            </div>
        <div className="ml-auto flex">
          {starElements}
        </div>
      </div>
      <p className="text-gray-700">{resena}</p>
    </div>
  );
};

export default CardResena;
