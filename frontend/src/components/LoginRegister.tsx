import React, { useState } from "react";
import { LogIn, UserPlus, Loader2, Check, XCircle } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

type Props = { onSuccess: () => void };

const LoginRegister: React.FC<Props> = ({ onSuccess }) => {
  const { register, login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState(""); // para el registro
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
        setMessage("Inicio de sesión exitoso 🎉");
      } else {
        await register(name, email, password);
        setMessage("Registro exitoso. Ahora puedes iniciar sesión ✅");
        setIsLogin(true);
      }
      onSuccess();
    } catch (err: any) {
      setError(err.message || "Ocurrió un error inesperado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-8 shadow-2xl rounded-xl">
        <h1 className="text-3xl font-extrabold text-center mb-6 flex items-center justify-center text-indigo-600">
          {isLogin ? <LogIn className="mr-3" /> : <UserPlus className="mr-3" />}
          {isLogin ? "Iniciar Sesión aaaaaaa" : "Registrar Cuenta"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Nombre"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded"
            />
          )}
          <input
            type="email"
            placeholder="Correo electrónico"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="password"
            placeholder="Contraseña"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
          />

          {error && (
            <div className="flex items-center p-2 bg-red-100 text-red-700 rounded">
              <XCircle className="w-4 h-4 mr-2" /> {error}
            </div>
          )}

          {message && !error && (
            <div className="flex items-center p-2 bg-green-100 text-green-700 rounded">
              <Check className="w-4 h-4 mr-2" /> {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded text-white ${
              loading ? "bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? (
              <Loader2 className="animate-spin w-5 h-5 mx-auto" />
            ) : isLogin ? (
              "Entrar"
            ) : (
              "Registrar"
            )}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError(null);
              setMessage(null);
            }}
            className="text-sm text-indigo-600 hover:underline"
          >
            {isLogin
              ? "¿No tienes cuenta? Regístrate"
              : "¿Ya tienes cuenta? Inicia Sesión"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
