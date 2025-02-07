import { Routes, Route } from 'react-router-dom';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

function App() {
  return (
    <div className="container mx-auto p-4">
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/create" element={<TaskForm />} />
        <Route path="/edit/:id" element={<TaskForm />} />
      </Routes>
    </div>
  );
}

export default App;