import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Todo } from "../../interfaces/Todo"
import api from "../../services/axiosConfig"
import toast from "react-hot-toast"

const AddTodo = () => {
    const [todo, setTodo] = useState<Todo>({
        title: "",
        description: "",
        status: "pending",
    })
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const token = localStorage.getItem("token")
        if (!token) {
            toast.error("Você precisa estar logado para adicionar uma tarefa.")
            navigate("/login")
            return
        }

        try {
            api.post("/todos", todo, {
                headers: { Authorization: `Bearer ${token}` },
            })
            toast.success("Tarefa adicionada com sucesso!")
            navigate("/home")
        } catch (error) {
            toast.error("Erro ao adicionar a tarefa. Tente novamente.")
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Adicionar Nova Tarefa</h2>
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
                    <div className="flex justify-end space-x-4">
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
                            Adicionar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddTodo