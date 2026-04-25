import { useEffect, useState } from "react";
import { getTasks, createTask, deleteTask, login } from "./api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [logged, setLogged] = useState(!!localStorage.getItem("token"));
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (logged) loadTasks(page);
  }, [logged, page]);

  const loadTasks = async (p = 1) => {
    const res = await getTasks(p);
    setTasks(res.data.results);
    setTotalPages(Math.ceil(res.data.count / 5));
  };

  const handleLogin = async () => {
    const res = await login(username, password);
    localStorage.setItem("token", res.data.access);
    setLogged(true);
  };

  const handleCreate = async () => {
    await createTask({ title });
    setTitle("");
    loadTasks(page);
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    loadTasks(page);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLogged(false);
    setTasks([]);
  };

  if (!logged) {
    return (
      <div>
        <h1>Login</h1>
        <input placeholder="Usuario" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input placeholder="Contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleLogin}>Entrar</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Lista de tareas</h1>
      <button onClick={handleLogout}>Cerrar sesión</button>
      <br /><br />
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Nueva tarea..." />
      <button onClick={handleCreate}>Agregar</button>
      <ul>
        {tasks.map(t => (
          <li key={t.id}>
            {t.title} — {t.completed ? "✅" : "⏳"}
            <button onClick={() => handleDelete(t.id)}>X</button>
          </li>
        ))}
      </ul>
      <div>
        <button onClick={() => setPage(p => p - 1)} disabled={page === 1}>← Anterior</button>
        <span> Página {page} de {totalPages} </span>
        <button onClick={() => setPage(p => p + 1)} disabled={page === totalPages}>Siguiente →</button>
      </div>
    </div>
  );
}

export default App;