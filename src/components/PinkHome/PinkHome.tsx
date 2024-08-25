"use client"
import React from 'react'
import MainCarousel from './MainCarousel'
import Casos from '../Casos/Casos'
import Servicios from '../Servicios/Servicios'
import Contacto from '../Contacto/Contacto'
import ShowCat from './ShowCat'
import Resenas from '../Resenas/Resenas'

const PinkHome = () => {
  return (
    <div 
    
    >
      <ShowCat />
      <Resenas />
      <MainCarousel />
      
      <Casos />
      <Servicios />
      <Contacto />
      </div>
  )
}

export default PinkHome