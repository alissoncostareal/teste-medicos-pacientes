import '../styles/sidebar.css';

export default function Sidebar({ setPage }) {
  return (
    <div className="sidebar">
      <h3>Menu</h3>

      <button onClick={() => setPage('pacientes')}>
        Pacientes
      </button>

      <button onClick={() => setPage('medicos')}>
        Médicos
      </button>
    </div>
  );
}