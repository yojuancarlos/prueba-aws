import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';

const TaskForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [task, setTask] = useState({ 
      title: '', 
      description: '', 
      file: null 
    });
  
    // Manejar selección de archivo
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          // Convertir a base64 y guardar en el estado
          setTask({
            ...task,
            file: {
              name: file.name,
              content: reader.result.split(',')[1] // Quitar prefijo data URL
            }
          });
        };
        reader.readAsDataURL(file);
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const payload = {
          title: task.title,
          description: task.description,
          fileName: task.file?.name,
          fileContent: task.file?.content
        };
  
        if (id) {
          await api.put(`/tasks/${id}`, payload);
        } else {
          await api.post('/task', payload);
        }
        navigate('/');
      } catch (error) {
        console.error('Error al guardar:', error);
        alert('Error al guardar la tarea');
      }
    };
  
    return (
      <div className="container mt-4">
        <div className="card shadow">
          <div className="card-body">
            <h2 className="card-title mb-4">
              {id ? 'Editar Tarea' : 'Crear Tarea'}
            </h2>
            
            <form onSubmit={handleSubmit}>
              {/* Campos existentes */}
              <div className="mb-3">
                <label className="form-label">Título</label>
                <input
                  type="text"
                  value={task.title}
                  onChange={(e) => setTask({ ...task, title: e.target.value })}
                  className="form-control"
                  required
                />
              </div>
  
              <div className="mb-3">
                <label className="form-label">Descripción</label>
                <textarea
                  value={task.description}
                  onChange={(e) => setTask({ ...task, description: e.target.value })}
                  className="form-control"
                  rows="4"
                />
              </div>
  
              {/* Nuevo campo para archivo */}
              <div className="mb-3">
                <label className="form-label">Adjuntar archivo</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="form-control"
                  accept=".pdf,.doc,.docx,.jpg,.png" // Tipos permitidos
                />
                {task.file && (
                  <small className="text-muted">
                    Archivo seleccionado: {task.file.name}
                  </small>
                )}
              </div>
  
              <button
                type="submit"
                className="btn btn-success mt-3"
              >
                {id ? 'Actualizar Tarea' : 'Crear Tarea'}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  };
  
  export default TaskForm;