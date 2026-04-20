import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Pacientes from './pages/Pacientes';
import Medicos from './pages/Medicos';
import './App.css';

function App() {
  const [page, setPage] = useState('pacientes');

  return (
    <div className="app">
      <Sidebar setPage={setPage} />

      <div className="content">
        {page === 'pacientes' && <Pacientes />}
        {page === 'medicos' && <Medicos />}
      </div>
    </div>
  );
}

export default App;