import React, {useState,useEffect,FC} from 'react'
import { updatedPassword } from '@/api/rorUserApi'
import { FaTimes } from 'react-icons/fa'
import { useRouter } from 'next/navigation'

interface CreateNewPasswordProps {
    dataRecovery: any
}

const CreateNewPassword:FC<CreateNewPasswordProps> = ({dataRecovery}) => {
    const [dataNewPassword, setDataNewPassword] = useState({
        password: '',
        confirmPassword: '',
        isValidPassword: false,
    })
    const [resultCreateVerification, setResultCreateVerification] = useState<any>(null)
    const router = useRouter();

    useEffect(() => {
        if(dataNewPassword.password.length > 0){
            const isValid=  validatePassword(dataNewPassword.password)
            setDataNewPassword({...dataNewPassword, isValidPassword: isValid})
        }
    }, [dataNewPassword.password])
    const handleSubmit = async(e: any) => {
        e.preventDefault()
        const tempDataRecovery = {
            ...dataRecovery,
            password: dataNewPassword.password
        }
        try {
            console.log('tempDataRecovery:',tempDataRecovery)
            const result = await updatedPassword(tempDataRecovery)
            console.log('result updatedPassword:',result)
            setResultCreateVerification(result)
            if(result.success){
                setTimeout(() => {
                    router.push('/signin')
                }, 2000)
            }
        } catch (error) {
            console.log(error)
            setResultCreateVerification({success:false, message:'Error en la actualización de la contraseña'})
        }
    }
    const validatePassword = (password: string) => {
        // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
        const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/
        return regexPassword.test(password)
    }
  return (
    <form 
    onSubmit={handleSubmit}
    className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-center text-gray-800">
            Ahora puedes Actualizar tu contraseña
        </h2>
        <div>
            <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
            >
            Nueva contraseña
            </label>
            <input
            type="password"
            id="password"
            value={dataNewPassword.password}
            onChange={(e)=>setDataNewPassword({...dataNewPassword, password: e.target.value})}
            placeholder="password"
            className="block w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
        </div>
        <div>
            <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700"
            >
            Confirmar contraseña
            </label>
            <input
            type="password"
            id="confirmPassword"
            value={dataNewPassword.confirmPassword}
            onChange={(e)=>setDataNewPassword({...dataNewPassword, confirmPassword: e.target.value})}
            placeholder="confirm password"
            className="block w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
        </div>
        {dataNewPassword.isValidPassword ? null : (
            <div className="text-red-600 text-sm mt-1">
            Contraseña inválida
            </div>
        )}
        {(dataNewPassword.password !== dataNewPassword.confirmPassword)&&dataNewPassword.isValidPassword ? (
            <div className="text-red-600 text-sm mt-1">
            Las contraseñas no coinciden
            </div>
        ) : null}
        
        <div className="text-center mt-3">
            <button
            type="submit"
            disabled={!(dataNewPassword.password === dataNewPassword.confirmPassword && dataNewPassword.isValidPassword)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
            Enviar
            </button>
        </div>
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
    </form>
  )
}

export default CreateNewPassword