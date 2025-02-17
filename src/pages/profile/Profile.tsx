import type React from "react"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import toast from "react-hot-toast"
import { ArrowLeft, EyeIcon, EyeOffIcon } from "lucide-react"
import { User } from "../../interfaces/User"

const UserProfile = () => {
    const [user, setUser] = useState<User | null>(null)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmNewPassword, setConfirmNewPassword] = useState("")
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = localStorage.getItem("token")
            if (!token) {
                toast.error("Você precisa estar logado para acessar esta página.")
                navigate("/")
                return
            }

            try {
                const response = await axios.get("http://localhost:3000/users/me", {
                    headers: { Authorization: `Bearer ${token}` },
                })
                setUser(response.data)
                setName(response.data.name)
                setEmail(response.data.email)
            } catch (error) {
                toast.error("Erro ao buscar informações do usuário.")
                navigate("/home")
            }
        }

        fetchUserProfile()
    }, [navigate])

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault()
        const token = localStorage.getItem("token")
        if (!token || !user) return

        try {
            await axios.put(
                `http://localhost:3000/users/${user.id}`,
                { name, email },
                {
                    headers: { Authorization: `Bearer ${token}` },
                },
            )
            navigate("/home")
            toast.success("Perfil atualizado com sucesso!")
        } catch (error) {
            toast.error("Erro ao atualizar o perfil.")
        }
    }

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault()
        const token = localStorage.getItem("token")
        if (!token || !user) return

        if (newPassword !== confirmNewPassword) {
            toast.error("As novas senhas não coincidem.")
            return
        }

        try {
            await axios.put(
                `http://localhost:3000/users/${user.id}`,
                { name, email, password:newPassword },
                {
                    headers: { Authorization: `Bearer ${token}` },
                },
            )
            toast.success("Senha alterada com sucesso!")
            setNewPassword("")
            setConfirmNewPassword("")
            navigate("/home")
        } catch (error) {
            toast.error("Erro ao alterar a senha.")
        }
    }

    const handleDeleteAccount = async () => {
        const token = localStorage.getItem("token")
        if (!token || !user) return

        if (
            window.confirm(
                "Tem certeza que deseja excluir sua conta? Esta ação irá excluir todas as suas tarefas e não pode ser desfeita.",
            )
        ) {
            try {
                await axios.delete(`http://localhost:3000/users/${user.id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                localStorage.removeItem("token")
                toast.success("Conta excluída com sucesso.")
                navigate("/")
            } catch (error) {
                toast.error("Erro ao excluir a conta.")
            }
        }
    }

    if (!user) return <div>Carregando...</div>

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 relative">
            <button
                onClick={() => navigate("/home")}
                className="absolute top-4 left-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                aria-label="Voltar"
            >
                <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
            <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <div className="px-4 py-5 sm:p-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Perfil do Usuário</h2>
                    <form onSubmit={handleUpdateProfile} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                Nome
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 px-4 py-3"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                E-mail
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 px-4 py-3"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Atualizar Perfil
                        </button>
                    </form>

                    <div className="mt-8 border-t border-gray-200 pt-6">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Alterar Senha</h3>
                        <form onSubmit={handleChangePassword} className="space-y-6">
                            <div className="relative">
                                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                    Nova Senha
                                </label>
                                <input
                                    type={showNewPassword ? "text" : "password"}
                                    id="newPassword"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 px-4 py-3"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    className="absolute right-0 top-[50%] transform translate-y-[-50%] pr-3 flex items-center"
                                >
                                    {showNewPassword ? (
                                        <EyeOffIcon className="h-5 w-5 text-gray-400" />
                                    ) : (
                                        <EyeIcon className="h-5 w-5 text-gray-400" />
                                    )}
                                </button>
                            </div>
                            <div className="relative">
                                <label
                                    htmlFor="confirmNewPassword"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                                >
                                    Confirmar Nova Senha
                                </label>
                                <input
                                    type={showConfirmNewPassword ? "text" : "password"}
                                    id="confirmNewPassword"
                                    value={confirmNewPassword}
                                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 px-4 py-3"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                                    className="absolute right-0 top-[50%] transform translate-y-[-50%] pr-3 flex items-center"
                                >
                                    {showConfirmNewPassword ? (
                                        <EyeOffIcon className="h-5 w-5 text-gray-400" />
                                    ) : (
                                        <EyeIcon className="h-5 w-5 text-gray-400" />
                                    )}
                                </button>
                            </div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                                Alterar Senha
                            </button>
                        </form>
                    </div>

                    <div className="mt-8 border-t border-gray-200 pt-6">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Excluir Conta</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                            Atenção: Esta ação não pode ser desfeita e irá excluir permanentemente sua conta e todas as suas tarefas.
                        </p>
                        <button
                            onClick={handleDeleteAccount}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                            Excluir Conta
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile