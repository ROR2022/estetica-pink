"use client";
import React, {useState} from 'react'
import { createVerification, confirmVerificationCode } from '@/api/rorUserApi';
import { FaTimes } from "react-icons/fa";
import CreateNewPassword from './CreateNewPassword';

const Forgot = () => {
  const [email, setEmail] = useState('')
  const [myCode, setMyCode] = useState('')
  const [resultCreateVerification, setResultCreateVerification] = useState<any>(null)
  const [verificationId, setVerificationId] = useState('')
  const [isCompleted, setIsCompleted] = useState(false)
  const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (regexEmail.test(email)) {
      console.log('Correo válido')
      const result= await createVerification(email)
      if(result.verification) setVerificationId(result.verification)
      setResultCreateVerification(result)
    } else {
      console.log('Correo inválido')
    }
  }
  const handleConfim = async () => {
    try {
      const result = await confirmVerificationCode(resultCreateVerification?.verification, myCode)
      console.log('result confirmVerification:',result)
      setResultCreateVerification(result)
      if(result.success){
        setIsCompleted(true)
      }
    } catch (error) {
      console.log(error)
      setResultCreateVerification({success:false, message:'Error en la confirmación'})
    }
  }
  return (
    <div
    className="bg-gray-100 min-h-screen flex items-center justify-center"
    >
      {isCompleted? (
        <CreateNewPassword dataRecovery={{email,myCode,verificationId}}/>
      ):(
<form 
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Actualizar contraseña
        </h2>
        {!resultCreateVerification?.success && (
          <>
<div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Correo
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="escribe tu correo"
            className="block w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {regexEmail.test(email) ? null : (
            <div className="text-red-600 text-sm mt-1">
              Correo inválido
            </div>
          )}
        </div>
        <div className="text-center mt-3">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Enviar
          </button>
        </div>
          </>
        )}
        
        <div>
            {resultCreateVerification?.message && (
              <div
                className={`text-center mt-3 p-3 text-white ${
                  resultCreateVerification?.success ? "bg-green-500" : "bg-red-500"
                }`}
              >
                {resultCreateVerification?.message}
                <FaTimes
                  className="float-right cursor-pointer"
                  onClick={() => setResultCreateVerification(null)}
                />
              </div>
              )}
          </div>
          {resultCreateVerification?.success && (
            <>
            <div className="text-center mt-3 text-blue-600">
              Revisa tu correo para continuar con el proceso
            </div>
            <div className="text-center mt-3">
              <label
                htmlFor="code"
                className="block text-sm font-small text-gray-700"
              >
                Código
              </label>
              <input
                type="text"
                id="code"
                value={myCode}
                onChange={(e) => setMyCode(e.target.value)}
                placeholder="escribe tu código"
                className="block w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="text-center mt-3">
              <button
                type="button"
                onClick={handleConfim}
                className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Confirmar
              </button>
            </div>
            </>
            )}
      </form>
      )}
      
      
    </div>
  )
}

export default Forgot