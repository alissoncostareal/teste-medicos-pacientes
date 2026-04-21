import { useState } from 'react';
import {
  createMedico,
  updateMedico,
  deleteMedico,
} from '../services/api';
import { useMedicos } from '../hooks/useMedicos';
import '../styles/medicos.css';

export default function Medicos() {
  const { medicos, setMedicos, loading, fetchMedicos } = useMedicos();

  const [form, setForm] = useState({
    nome: '',
    CRM: '',
    UFCRM: '',
  });

  const [editId, setEditId] = useState(null);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setLoadingSubmit(true);
    setError('');

    try {
      if (editId) {
        await updateMedico(editId, form);
      } else {
        await createMedico(form);
      }

      setForm({ nome: '', CRM: '', UFCRM: '' });
      setEditId(null);
      fetchMedicos();
    } catch (err) {
      console.log(err);
      setError('Erro ao salvar médico');
    } finally {
      setLoadingSubmit(false);
    }
  }

  async function handleDelete(id) {
    const confirmDelete = window.confirm('Deseja remover?');
    if (!confirmDelete) return;

    await deleteMedico(id);

    if (editId === id) {
      setEditId(null);
      setForm({ nome: '', CRM: '', UFCRM: '' });
    }

    //setMedicos((prev) => prev.filter((m) => m.id !== id));
    await fetchMedicos();
  }

  function handleEdit(m) {
    setForm({
      nome: m.nome,
      CRM: m.CRM,
      UFCRM: m.UFCRM,
    });

    setEditId(m.id);
  }

  return (
    <div>
      <h2>Médicos</h2>

      <form className="form" onSubmit={handleSubmit}>
        <input
          placeholder="Nome"
          value={form.nome}
          onChange={(e) =>
            setForm({ ...form, nome: e.target.value })
          }
        />

        <input
          placeholder="CRM"
          value={form.CRM}
          onChange={(e) =>
            setForm({ ...form, CRM: e.target.value })
          }
        />

        <input
          placeholder="UF"
          value={form.UFCRM}
          onChange={(e) =>
            setForm({ ...form, UFCRM: e.target.value })
          }
        />

        <button type="submit">
          {loadingSubmit
            ? 'Salvando...'
            : editId
            ? 'Atualizar'
            : 'Cadastrar'}
        </button>

        {editId && (
          <button
            type="button"
            onClick={() => {
              setEditId(null);
              setForm({ nome: '', CRM: '', UFCRM: '' });
            }}
          >
            Cancelar
          </button>
        )}
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {loading ? (
        <p>Carregando...</p>
      ) : medicos.length === 0 ? (
        <p>Nenhum médico cadastrado</p>
      ) : (
        <ul className="list">
          {medicos.map((m) => (
            <li key={m.id}>
              <strong>{m.nome}</strong> - {m.CRM}/{m.UFCRM}

              <div>
                <button onClick={() => handleEdit(m)}>
                  Editar
                </button>

                <button
                  onClick={() => handleDelete(m.id)}
                  style={{ marginLeft: 10, background: 'red' }}
                >
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}