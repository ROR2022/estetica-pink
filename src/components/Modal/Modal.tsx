import { ReactNode, useState } from 'react';
import { confirmVerificationCode } from '@/api/rorUserApi';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/userSlice';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  type: string;
  verification?: string;
}

export default function Modal({ isOpen, onClose, title, children, type, verification }: ModalProps) {
    const [myCode, setMyCode] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState(false);
    const router = useRouter();
    const dispatch = useDispatch();
  if (!isOpen) return null;

  const handleConfirm = async() => {
    //onClose();
    try {
        console.log('iniciando confirmación:', verification, myCode);
        const result = await confirmVerificationCode(verification, myCode);
        const {success, message, dataUser} = result;
        setMessage(message);
        //console.log('dataUser:', dataUser);
        if(success){
            //window.location.href = '/login';
            setError(false);
            dispatch(setUser(dataUser));
        }else{
            setError(true);
        }
        setTimeout(() => {
            onClose();
            router.push('/');
        }, 5000);

    } catch (error) {
        console.log(error);
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-lg w-full">
        <div className="px-4 py-2 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 
            
            className={type==='error'?"text-lg font-medium text-red-600 bg-white":"text-lg font-medium text-green-600 bg-white"}>{title}</h2>

            
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              ×
            </button>
          </div>
        </div>
        <div className="p-4">{children}</div>
        {
            type!=='error' && (
                <div 
                style={{
                  maxWidth: '300px',
                  margin: 'auto',
                }}
                
                >
                <label htmlFor="code" className="block text-sm font-small text-gray-700">
                    Código
                </label>
                <input
                type="text"
                id='code'
                value={myCode}
                onChange={(e)=>setMyCode(e.target.value)}
                placeholder="escribe tu código"
                className="block w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                </div>
            )
        }
        {message && (
            <div className={error?"text-center text-red-600":"text-center text-green-600"}>
                {message}
            </div>
        )}
        <div className="px-4 py-3 border-t border-gray-200 flex justify-end mt-3">
        {type!=='error' && (
                <button
                onClick={handleConfirm}
                className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-blue-600 me-3"
                >
                Confirm
                </button>
                )}
          <button
            onClick={onClose}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
