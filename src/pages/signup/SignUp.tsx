import type React from "react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import api from "../../services/axiosConfig"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import toast from "react-hot-toast"

const SignUpPage = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const navigate = useNavigate()

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            toast.error("As senhas não coincidem")
            return
        }
        if (password.length < 8) {
            toast.error("A senha deve ter pelo menos 8 caracteres")
            return
        }
        try {
            const response = await toast.promise(
                api.post("/users", { name, email, password }),
                {
                    loading: "Criando conta...",
                    success: <b>Usuário cadastrado com sucesso!</b>
                }
            )
            if (response.status === 201) {
                navigate("/")
            }
        } catch (error: any) {
            if (error.response?.status === 400) {
                toast.error("Este e-mail já está em uso")
            } else {
                toast.error("Erro ao criar conta: " + error.message)
            }
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-blue-500">
            <div className="w-full max-w-lg overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
                <div className="relative h-40 flex items-center justify-center">
                    <img src="/images/todo.svg" alt="Todos" className="w-44 h-44 object-cover mx-auto" />
                </div>
                <div className="p-6">
                    <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">Criar Conta</h2>
                    <form onSubmit={handleSignUp} className="space-y-4">
                        <div className="space-y-1">
                            <label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                Nome
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                placeholder="Digite seu nome"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
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
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                    placeholder="Digite sua senha (mínimo 8 caracteres)"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    minLength={8}
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
                        <div className="space-y-1">
                            <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                Confirmar Senha
                            </label>
                            <div className="relative">
                                <input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    placeholder="Confirme sua senha"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    minLength={8}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? (
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
                            Criar Conta
                        </button>
                    </form>
                    <div className="mt-4 text-center">
                        <Link to="/" className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">
                            Já tem uma conta? Faça login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage