import React from 'react'
import CardCaso from './CardCaso'
import {tecnicasColoracion} from '@/components/data/dataUser'

const Casos = () => {
  return (
    <div className='flex flex-wrap justify-center my-3'>
      {
        tecnicasColoracion.map((caso, index) => {
          return(
            <CardCaso
            key={caso.title}
            title={caso.title}
            imageUrl={caso.imageUrl}
            text={caso.text}
            />
          )
        })
      }
      </div>
  )
}

export default Casos