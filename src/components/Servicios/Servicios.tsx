"use client"
import React, {useEffect} from 'react'
import Image from 'next/image'
import { dataServicios } from '@/components/data/dataUser'
import { useMediaQuery } from 'react-responsive'
const Servicios = () => {
   const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1000px)'
  }) 

  useEffect(() => {
    //console.log('isDesktopOrLaptop', isDesktopOrLaptop)
  }, [isDesktopOrLaptop])

  return (
    <div className='flex flex-wrap'>
      
      
        {dataServicios.map((servicio, index) => {
          return(
            <div 
            key={servicio.title}
            style={{
              border: '1px solid white',
              margin: '10px',
              padding: '10px',
              position: 'relative',
              borderRadius: '10px',
              minHeight: '300px',
              maxHeight:'auto',
              maxWidth: '350px',
              marginLeft:'auto',
              marginRight: 'auto',
            }}
            >
              <Image 
              src={servicio.imageUrl} 
              alt={servicio.title} 
              width={200} 
              height={200} 
              style={{
                position: 'relative',
                float: index % 2 === 0 ? 'right' : 'left',  
                borderRadius: '10px',
                maxWidth: '50%',
                maxHeight: 'auto',
                objectFit: 'contain',
                marginRight: index % 2 === 0 ? '0' : '10px',
              }}
              />
              <div >
              <h2
              style={{
                color: 'white',
                fontSize: '1.5rem',
                marginBottom: '20px',
                
              }}
              >{servicio.title}</h2>
              <p>{servicio.text}</p>
              </div>
            </div>
          )
        })}
          
      
      
    </div>
  )
}

export default Servicios