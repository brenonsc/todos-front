import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import toast from "react-hot-toast"
import { Todo } from "../../interfaces/Todo"

const EditTodo = () => {
    const [todo, setTodo] = useState<Todo | null>(null)
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchTodo = async () => {
            const token = localStorage.getItem("token")
            if (!token) {
                toast.error("Você precisa estar logado para acessar esta página.")
                navigate("/login")
                return
            }

            try {
                const response = await axios.get(`http://localhost:3000/todos/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                setTodo(response.data)
            } catch (error) {
                toast.error("Erro ao buscar a tarefa. Verifique sua conexão.")
                navigate("/home")
            }
        }

        fetchTodo()
    }, [id, navigate])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const token = localStorage.getItem("token")
        if (!token || !todo) return

        try {
            await axios.put(`http://localhost:3000/todos/${id}`, todo, {
                headers: { Authorization: `Bearer ${token}` },
            })
            toast.success("Tarefa atualizada com sucesso!")
            navigate("/home")
        } catch (error) {
            toast.error("Erro ao atualizar a tarefa. Tente novamente.")
        }
    }

    const handleDelete = async () => {
        const token = localStorage.getItem("token")
        if (!token || !todo) return

        if (window.confirm("Tem certeza que deseja excluir esta tarefa?")) {
            try {
                await axios.delete(`http://localhost:3000/todos/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                toast.success("Tarefa excluída com sucesso!")
                navigate("/home")
            } catch (error) {
                toast.error("Erro ao excluir a tarefa. Tente novamente.")
            }
        }
    }

    if (!todo) return <div>Carregando...</div>

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Editar Tarefa</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                            Título
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={todo.title}
                            onChange={(e) => setTodo({ ...todo, title: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 px-4 py-3"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                            Descrição
                        </label>
                        <textarea
                            id="description"
                            value={todo.description}
                            onChange={(e) => setTodo({ ...todo, description: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 px-4 py-3"
                            rows={3}
                            required
                        ></textarea>
                    </div>
                    <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                            Status
                        </label>
                        <select
                            id="status"
                            value={todo.status}
                            onChange={(e) => setTodo({ ...todo, status: e.target.value as Todo["status"] })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 px-4 py-3"
                        >
                            <option value="pending">Pendente</option>
                            <option value="in_progress">Em progresso</option>
                            <option value="completed">Concluída</option>
                        </select>
                    </div>
                    <div className="flex justify-between space-x-4">
                        <button
                            type="button"
                            onClick={handleDelete}
                            className="px-4 py-2 border border-red-500 rounded-md text-sm font-medium text-red-500 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                            Excluir
                        </button>
                        <div>
                            <button
                                type="button"
                                onClick={() => navigate("/home")}
                                className="mr-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-white hover:bg-gray-50 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Salvar
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditTodo