import React, { useState, useEffect, useCallback } from "react";
import {
  List,
  LogOut,
  Check,
  Edit,
  Save,
  Trash2,
  Loader2,
  XCircle,
  Plus,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { Task } from "../types";
import { api } from "../api/axios";

const TaskDashboard: React.FC = () => {
  const { logout } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [error, setError] = useState<string | null>(null);

  //  Cargar tareas desde la API
  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get("/task", { withCredentials: true });
      setTasks(res.data);
    } catch (err: any) {
      console.error("Error cargando tareas:", err);
      setError("No se pudieron cargar las tareas 😔");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // ✅ Crear nueva tarea
  const handleAddTask = async () => {
    if (!newTaskTitle.trim()) return;
    try {
      const res = await api.post(
        "/task",
        {
          title: newTaskTitle.trim(),
          description: newTaskDescription.trim(),
          completed: false,
        },
        { withCredentials: true }
      );
      setTasks((prev) => [...prev, res.data]);
      setNewTaskTitle("");
      setNewTaskDescription("");
    } catch {
      setError("No se pudo crear la tarea 😢");
    }
  };

  // ✅ Marcar tarea como completada
  const handleToggle = async (id: number, completed: boolean) => {
    try {
      const res = await api.put(
        `/task/${id}`,
        { completed: !completed },
        { withCredentials: true }
      );
      setTasks((prev) => prev.map((t) => (t.id === id ? res.data : t)));
    } catch {
      setError("No se pudo actualizar la tarea.");
    }
  };

  // ✅ Editar tarea (título + descripción)
  const handleSaveEdit = async (id: number) => {
    if (!editTitle.trim()) return;
    try {
      const res = await api.put(
        `/task/${id}`,
        { title: editTitle.trim(), description: editDescription.trim() },
        { withCredentials: true }
      );
      setTasks((prev) => prev.map((t) => (t.id === id ? res.data : t)));
      setEditId(null);
    } catch {
      setError("Error al editar la tarea.");
    }
  };

  // ✅ Eliminar tarea
  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/task/${id}`, { withCredentials: true });
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch {
      setError("Error al eliminar la tarea.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <header className="flex justify-between items-center bg-white p-4 rounded-lg shadow mb-6">
        <h1 className="text-2xl font-bold text-indigo-600 flex items-center">
          <List className="mr-2" /> Panel de Tareas
        </h1>
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" /> Salir
        </button>
      </header>

      {/* Contenedor */}
      <div className="max-w-2xl mx-auto bg-white p-4 rounded-lg shadow">
        {error && (
          <div className="flex items-center p-2 bg-red-100 text-red-700 rounded mb-3">
            <XCircle className="w-4 h-4 mr-2" /> {error}
          </div>
        )}

        {/* Crear tarea */}
        <div className="flex flex-col gap-3 mb-8 p-5 bg-white rounded-xl shadow-lg border border-gray-200">
          <h3 className="text-xl font-semibold text-indigo-600">Crear Tarea</h3>

          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 placeholder-gray-500"
            placeholder="Título de la tarea"
          />

          <textarea
            rows={3}
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 resize-none placeholder-gray-500"
            placeholder="Descripción detallada"
          />

          <div className="flex justify-end">
            <button
              onClick={handleAddTask}
              disabled={!newTaskTitle.trim()}
              className={`text-white font-medium py-2 px-6 rounded-lg transition duration-150 ease-in-out shadow-md flex items-center gap-2 ${
                !newTaskTitle.trim()
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg"
              }`}
            >
              <Plus className="w-5 h-5" /> Añadir Tarea
            </button>
          </div>
        </div>

        {/* Lista de tareas */}
        {loading ? (
          <div className="flex justify-center p-6">
            <Loader2 className="animate-spin w-8 h-8 text-indigo-500" />
          </div>
        ) : tasks.length === 0 ? (
          <p className="text-center text-gray-500 py-6">
            No tienes tareas aún. ¡Crea una nueva! ✨
          </p>
        ) : (
          <ul className="space-y-3">
            {tasks.map((task) => (
              <li
                key={task.id}
                className={`border rounded-lg p-4 shadow-sm bg-gray-50 hover:bg-gray-100 transition ${
                  task.completed ? "opacity-70" : ""
                }`}
              >
                <div className="flex justify-between items-start">
                  {/* Checkbox */}
                  <div
                    onClick={() => handleToggle(task.id, task.completed)}
                    className={`cursor-pointer w-6 h-6 flex items-center justify-center border-2 rounded-full ${
                      task.completed
                        ? "bg-green-500 border-green-500 text-white"
                        : "border-gray-400"
                    }`}
                  >
                    {task.completed && <Check className="w-4 h-4" />}
                  </div>

                  {/* Título + descripción */}
                  <div className="flex-1 ml-4">
                    {editId === task.id ? (
                      <>
                        <input
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className="w-full border-b focus:outline-none mb-2"
                          placeholder="Título..."
                        />
                        <textarea
                          value={editDescription}
                          onChange={(e) =>
                            setEditDescription(e.target.value)
                          }
                          rows={2}
                          className="w-full border rounded p-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Descripción..."
                        />
                      </>
                    ) : (
                      <>
                        <h4
                          className={`font-semibold ${
                            task.completed
                              ? "line-through text-gray-500"
                              : "text-gray-800"
                          }`}
                          onDoubleClick={() => {
                            setEditId(task.id);
                            setEditTitle(task.title);
                            setEditDescription(task.description || "");
                          }}
                        >
                          {task.title}
                        </h4>
                        {task.description && (
                          <p className="text-sm text-gray-600 mt-1">
                            {task.description}
                          </p>
                        )}
                      </>
                    )}
                  </div>

                  {/* Acciones */}
                  <div className="flex gap-2 ml-3">
                    {editId === task.id ? (
                      <Save
                        onClick={() => handleSaveEdit(task.id)}
                        className="text-green-600 cursor-pointer"
                      />
                    ) : (
                      <Edit
                        onClick={() => {
                          setEditId(task.id);
                          setEditTitle(task.title);
                          setEditDescription(task.description || "");
                        }}
                        className="text-indigo-600 cursor-pointer"
                      />
                    )}
                    <Trash2
                      onClick={() => handleDelete(task.id)}
                      className="text-red-600 cursor-pointer"
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TaskDashboard;
