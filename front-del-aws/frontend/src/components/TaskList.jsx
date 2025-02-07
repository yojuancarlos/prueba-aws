import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get('/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error al obtener tareas:', error);
      }
    };
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Error al eliminar:', error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h2">Lista de Tareas</h1>
        <Link to="/create" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Crear Nueva Tarea
        </Link>
      </div>

      <div className="row">
        {tasks.map((task) => (
          <div key={task.id} className="col-md-6 mb-3">
            <div className="card shadow-sm">
              <div className="card-body">
                <h3 className="card-title h5 mb-2">{task.title}</h3>
                <p className="card-text text-muted">{task.description}</p>

                {/* Botones de acción */}
                <div className="d-flex gap-2 mt-3">
                  <Link to={`/edit/${task.id}`} className="btn btn-warning btn-sm">
                    Editar
                  </Link>
                  <button onClick={() => handleDelete(task.id)} className="btn btn-danger btn-sm">
                    Eliminar
                  </button>
                </div>

                {/* Mostrar enlace de archivo si existe */}
                {task.fileUrl && (
                  <div className="mt-2">
                    <a 
                      href={task.fileUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn btn-link"
                    >
                      📎 Ver archivo adjunto
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
