import { useEffect, useState } from "react";
import { getTasks, createTask, deleteTask } from "./api";

function App() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        const res = await getTasks();
        setTasks(res.data);
    };

    const handleCreate = async () => {
        if (!title.trim()) return; // evita enviar título vacío
        await createTask({ title });
        setTitle("");
        loadTasks();
    };

    const handleDelete = async (id) => {
        await deleteTask(id);
        loadTasks();
    };

    return (
        <div>
            <h1>Lista de tareas</h1>
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Nueva tarea..."
            />
            <button onClick={handleCreate}>Agregar</button>
            <ul>
                {tasks.map(t => (
                    <li key={t.id}>
                        {t.title}
                        <button onClick={() => handleDelete(t.id)}>X</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;