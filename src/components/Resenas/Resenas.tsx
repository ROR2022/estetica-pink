import React,{FC, useState, useEffect} from 'react'
import CardResena from './CardResena'
import Slider from 'react-slick';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';
import { getResenas } from '@/api/rorUserApi';
import { dataAvatares } from '../SignUp/SignUp';
import { useSelector } from 'react-redux';



const tempDataResenas = [
    {
        id: 1,
        name: 'Juan Perez',
        avatarUrl: '/avatar1.png',
        resena: 'Excelente servicio, muy recomendado',
        stars: 5
    },
    {
        id: 2,
        name: 'Maria Lopez',
        avatarUrl: '/avatar2.png',
        resena: 'Muy buen servicio, lo recomiendo',
        stars: 4
    },
    {
        id: 3,
        name: 'Pedro Ramirez',
        avatarUrl: '/avatar3.png',
        resena: 'Muy mal servicio, no lo recomiendo',
        stars: 1
    }
    ]

    interface NextArrowProps {
        onClick: () => void;
    }

    const NextArrow:FC<NextArrowProps> = ({ onClick }) => {
        
        return (
          <div
            className="absolute bottom-1/3 right-4 transform -translate-y-1/3 z-10 cursor-pointer"
            onClick={onClick}
          >
            <FaArrowRight className="text-3xl text-gray-600 hover:text-gray-800" />
          </div>
        );
      };
      
      const PrevArrow:FC<NextArrowProps> = ({ onClick }) => {
        return (
          <div
            className="absolute bottom-1/5 left-4 transform -translate-y-1/5 z-10 cursor-pointer"
            onClick={onClick}
          >
            <FaArrowLeft className="text-3xl text-gray-600 hover:text-gray-800" />
          </div>
        );
      };
      
      interface DataResenaProps {
          id: number;
          name: string;
          resena: string;
          stars: number;
          avatarUrl: string;
      }

const Resenas = () => {
  const [dataResenas, setDataResenas] = useState<any>([]);
  const user= useSelector((state:any)=>state.user);

  useEffect(() => {
    fetchResenas();
  }, []);



  const fetchResenas = async () => {
    try {
        const resenas = await getResenas();
        if(resenas.length !== 0){
            let tempResenas:any=[];
            resenas.forEach((dataResena:any) => {
              const tempDataResena = {
                id: dataResena._id,
                resena: dataResena.resena,
                stars: dataResena.calificacion,
                name: dataResena.idUsuario.username,
                avatarUrl: dataAvatares.find((avatar) => avatar.title === dataResena.idUsuario.avatar)?.url || ''
              }
              tempResenas.push(tempDataResena);
            });
            console.log('tempResenas:', tempResenas);
            setDataResenas(tempResenas);
        }
        
        console.log('resenas:', resenas);
    } catch (error) {
        console.log(error);
    }
  }

    const handleClickNext = () => {
        (document.querySelector('.slick-next') as HTMLElement)?.click();
    };
    
    const handleClickPrev = () => {
        (document.querySelector('.slick-prev') as HTMLElement)?.click();
    }
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        nextArrow: <NextArrow onClick={handleClickNext}/>,
        prevArrow: <PrevArrow onClick={handleClickPrev}/>,
    };
    
  return (
    <div
    style={{maxWidth: '800px', margin: 'auto'}}
    >
        <h3 className='text-center my-3 text-3xl'>Reseñas</h3>
        <div
        className='flex justify-center gap-4 my-4'
        >
          {(user && user.access_token)?
          (
<Link 
        className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
        href="/create-resena">
            Crear Reseña
        </Link>
          ):(
            <Link
            href="/signup"
            className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
                Registrate para crear una reseña
            </Link>
          )
          }
        
        </div>
        
        <Slider {...settings}>
                {dataResenas?.map((resena:any) => (
                    <CardResena 
                        key={resena.id}
                        dataResena={resena}
                    />
                ))}
            </Slider>
        </div>
  )
}

export default Resenas