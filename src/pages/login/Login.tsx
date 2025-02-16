import type React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import toast from "react-hot-toast";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await toast.promise(
                axios.post("http://localhost:3000/login", { email, password }),
                {
                    loading: "Autenticando...",
                    success: <b>Usuário autenticado!</b>,
                }
            );

            if (response.status === 200 && response.data.token) {
                localStorage.setItem("token", response.data.token);
                navigate("/home");
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 401) {
                    toast.error("Usuário ou senha incorretos.");
                } else if (error.response.status === 500) {
                    toast.error("Erro interno do servidor.");
                } else {
                    toast.error("Erro inesperado: " + error.response.status);
                }
            } else {
                toast.error("Falha na conexão com o servidor.");
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-blue-500">
            <div className="w-full max-w-lg overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
                <div className="relative h-40 flex items-center justify-center">
                    <img src="/images/todo.svg" alt="Todos" className="w-44 h-44 object-cover mx-auto" />
                </div>
                <div className="p-8">
                    <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">Bem-vindo!</h2>
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-1">
                            <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                E-mail
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="Digite seu e-mail"
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="space-y-1">
                            <label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                Senha
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="Digite sua senha"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOffIcon className="h-5 w-5 text-gray-400" />
                                    ) : (
                                        <EyeIcon className="h-5 w-5 text-gray-400" />
                                    )}
                                </button>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 p-8"
                        >
                            Entrar
                        </button>
                    </form>
                    <div className="mt-4 text-center">
                        <Link
                            to="/signup"
                            className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                            Não é cadastrado? Crie uma conta
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;