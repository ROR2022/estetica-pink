"use client";
import React from 'react'
import { useRouter } from 'next/navigation';
import { useSelector } from "react-redux";
//import { dataAvatares } from "../SignUp/SignUp";
import { DataUser } from "@/redux/userSlice";
import { useLocalStorage } from "usehooks-ts";
import { logout } from "@/redux/userSlice";
import { useDispatch } from "react-redux";
import { initialState } from '@/redux/userSlice';

const Logout = () => {
  const user = useSelector((state: any) => state.user);
  const [storedUser, setStoredUser] = useLocalStorage<DataUser>('user', user);
  const dispatch = useDispatch();
  const router = useRouter();
  const handleClose = () => {
    //window.location.href = '/logout'
    router.push('/')
  }
  const handleLogout = () => {
    //window.location.href = '/logout'
    //router.push('/logout')
    dispatch(logout());
    setStoredUser(initialState);
    router.push('/')
  }
  return (
    <div 
    style={{maxWidth: '350px', margin: 'auto', marginTop: '50px'}}
    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
    <span className="block sm:inline p-2">Estas Seguro de que quieres Salir ??</span>
    <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
      <svg
        className="fill-current h-6 w-6 text-red-500"
        role="button"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        onClick={handleClose}
      >
        <title>Close</title>
        <path d="M14.348 5.652a.5.5 0 00-.707 0L10 9.293 6.354 5.646a.5.5 0 00-.708.708L9.293 10l-3.647 3.646a.5.5 0 00.708.708L10 10.707l3.646 3.647a.5.5 0 00.708-.708L10.707 10l3.647-3.646a.5.5 0 000-.707z" />
      </svg>
    </span>
    <div
    style={{display: 'flex', justifyContent: 'center', marginTop: '10px'}}
    >
    <button 
    onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
      Salir
    </button>
    </div>
  </div>
  )
}

export default Logout