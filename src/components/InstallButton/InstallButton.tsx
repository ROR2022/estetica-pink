"use client";
// components/InstallButton.tsx
import React, { useState, useEffect } from 'react';
//importar el icono de instalación de react-icons 
//import { AddToHomeScreen } from '@mui/icons-material';
//importar Button de material ui
//import { Button } from '@mui/material';
import { AiOutlineDownload } from 'react-icons/ai';
import { postDebugMsg } from '@/api/rorUserApi';
import isMobile from 'ismobilejs';



const InstallButton: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsVisible(true);
    };
    const dataNavigator = isMobile(window.navigator);
    const android:any= dataNavigator.android;
    const apple:any= dataNavigator.apple;
    //console.log('Datos isMobile:...', dataNavigator);
    //recorrer el objeto android para ver sus propiedades y valores para determinar si es un dispositivo android
    let isAndroid=false;
    let isApple=false;
    for (const key in android) {
      if(android[key]===true){
        console.log('Es un dispositivo android');
        isAndroid=true;
      }
    }
    for (const key in apple) {
      if(apple[key]===true){
        console.log('Es un dispositivo apple');
        isApple=true;
      }
    }
    if(isAndroid){
      //console.log('Es un dispositivo android');
      window.addEventListener('beforeinstallprompt', handler);
    }else{
      const objNavigator:any=window.navigator;
      if (objNavigator.standalone) {
        // The web app is installed as a standalone app on the home screen
        postDebugMsg('+++++ Applicacion ya instalada debug +++++');
      } else {
        // The web app is not installed as a standalone app on the home screen
        postDebugMsg('+++++ Iniciando Instalacion de Applicacion debug +++++');
        setIsVisible(true);
      }
    }

    //console.log('InstallButton useEffect...');
    //postDebugMsg('+++++ InstallButton Iniciando debug +++++', dataNavigator);
    

    return () => {
      if(isAndroid===true){
        window.removeEventListener('beforeinstallprompt', handler);
      }
      
    }
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    const promptEvent = deferredPrompt as any;
    promptEvent.prompt();
    const { outcome } = await promptEvent.userChoice;
    if (outcome === 'accepted') {
      console.log('PWA setup accepted');
    } else {
      console.log('PWA setup rejected');
    }
    setDeferredPrompt(null);
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
    style={{
      width: "100vw",
      
      display: "flex",
      justifyContent: "center",
      marginTop: "20px",
    }}
    >
    <button
  className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
  onClick={handleInstallClick}
>
  <AiOutlineDownload />
  Install
</button>
</div>
  );
};

export default InstallButton;
