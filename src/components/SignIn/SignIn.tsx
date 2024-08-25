"use client";
import { useState } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { DataUser, setUser } from "@/redux/userSlice";
import { useLocalStorage } from "usehooks-ts";
import { loginUser } from "@/api/rorUserApi";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const user = useSelector((state: any) => state.user);
  const [storedUser, setStoredUser] = useLocalStorage<DataUser>("user", user);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSignIn = async (e: any) => {
    e.preventDefault();
    // Lógica para manejar el inicio de sesión
    //console.log({ email, password });
    try {
      setLoading(true);
      const response = await loginUser({ email, password });
      const { access_token, ...datauser } = response;
      if (access_token) {
        dispatch(setUser({ access_token, ...datauser }));
        setStoredUser({ access_token, ...datauser });
        setError("");
        setLoginSuccess(true);
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        console.log("Error al iniciar sesión");
        const stringError = `${response.error || "Error"} ${
          response.message || "al iniciar sesión"
        }`;
        setError(stringError);
        setLoginSuccess(false);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError("Error al iniciar sesión");
      setLoginSuccess(false);
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
        <form className="space-y-6" onSubmit={handleSignIn}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link
                href="/forgot"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Olvidaste tu password?
              </Link>
            </div>
            <div className="text-sm">
              <Link
                href="/signup"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                No estas registrado Registrate aqui?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={!email || !password}
              className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {email && password && !loading && "Iniciar Sesión"}
              {(!email || !password) && !loading && "Completa los campos"}
              {loading && (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white-500"></div>
                </div>
              )}
            </button>
          </div>
          {error && <div className="text-red-500">{error}</div>}
          {loginSuccess && (
            <div className="text-green-500">Iniciando sesión...</div>
          )}
        </form>
      </div>
    </div>
  );
}
