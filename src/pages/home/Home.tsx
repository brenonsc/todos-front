import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import toast from "react-hot-toast"
import { PlusIcon, LogOutIcon } from "lucide-react"

interface Todo {
    id: string
    title: string
    description: string
    status: "pending" | "in_progress" | "completed"
    createdAt: string
}

const Home = () => {
    const [todos, setTodos] = useState<Todo[]>([])
    const navigate = useNavigate()

    useEffect(() => {
        fetchTodos()
    }, [])

    const fetchTodos = async () => {
        const token = localStorage.getItem("token")
        if (!token) {
            toast.error("Você precisa estar logado para acessar esta página.")
            navigate("/")
            return
        }

        try {
            const response = await axios.get("http://localhost:3000/todos", {
                headers: { Authorization: `Bearer ${token}` },
            })
            setTodos(response.data)
        } catch (error) {
            toast.error("Erro ao buscar tarefas. Verifique sua conexão.")
            navigate("/")
        }
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return format(date, "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR })
    }

    const getStatusClass = (status: string) => {
        switch (status) {
            case "completed":
                return "bg-green-200 text-green-800"
            case "in_progress":
                return "bg-blue-200 text-blue-800"
            case "pending":
            default:
                return "bg-yellow-200 text-yellow-800"
        }
    }

    const getStatusText = (status: string) => {
        switch (status) {
            case "completed":
                return "Concluída"
            case "in_progress":
                return "Em progresso"
            case "pending":
            default:
                return "Pendente"
        }
    }

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem("token")
            await axios.post("http://localhost:3000/logout", {}, {
                headers: { Authorization: `Bearer ${token}` }
            })
            localStorage.removeItem("token")
            navigate("/")
            toast.success("Logout realizado com sucesso!")
        } catch (error) {
            toast.error("Erro ao realizar logout: " + error.message)
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 relative">
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Minhas Tarefas</h1>
                    <button
                        onClick={handleLogout}
                        className="flex items-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                    >
                        <LogOutIcon className="mr-2" size={18} />
                        Logout
                    </button>
                </div>
                {todos.length === 0 ? (
                    <div className="text-center text-gray-600 dark:text-gray-400 text-xl mt-20">
                        Não há tarefas cadastradas. Clique no botão "+" para adicionar uma nova tarefa.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {todos.map((todo) => (
                            <Link to={`/edit/${todo.id}`} key={todo.id} className="block">
                                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                                    <div className="p-6">
                                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{todo.title}</h2>
                                        <p className="text-gray-600 dark:text-gray-300 mb-4">{todo.description}</p>
                                        <div className="flex justify-between items-center">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusClass(todo.status)}`}>
                        {getStatusText(todo.status)}
                      </span>
                                            <span className="text-sm text-gray-500 dark:text-gray-400">{formatDate(todo.createdAt)}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
            <Link
                to="/add"
                className="fixed bottom-8 right-8 w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-blue-600 transition-colors"
            >
                <PlusIcon size={24} />
            </Link>
        </div>
    )
}

export default Home