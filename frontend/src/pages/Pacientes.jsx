import { useState } from 'react';
import {
  createPaciente,
  updatePaciente,
  deletePaciente,
} from '../services/api';
import { usePacientes } from '../hooks/usePacientes';
import '../styles/pacientes.css';

export default function Pacientes() {
  const { pacientes, loading, fetchPacientes } = usePacientes();

  const [form, setForm] = useState({
    nome: '',
    dataNascimento: '',
    carteirinha: '',
    cpf: '',
  });

  const [error, setError] = useState('');
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [editId, setEditId] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoadingSubmit(true);

    try {
      if (editId) {
        await updatePaciente(editId, form);
      } else {
        await createPaciente(form);
      }

      setForm({
        nome: '',
        dataNascimento: '',
        carteirinha: '',
        cpf: '',
      });

      setEditId(null);
      fetchPacientes();
    } catch (err) {
      console.log(err);

      if (err.message === 'CPF_ALREADY_EXISTS') {
        setError('CPF já cadastrado');
      } else {
        setError('Erro ao salvar paciente');
      }
    } finally {
      setLoadingSubmit(false);
    }
  }

  // 🔥 DELETAR
  async function handleDelete(id) {
    const confirmDelete = window.confirm('Deseja remover?');
    if (!confirmDelete) return;

    await deletePaciente(id);
    if (editId === id) {
      setEditId(null);

      setForm({
        nome: '',
        dataNascimento: '',
        carteirinha: '',
        cpf: '',
      });
    }
    fetchPacientes();
  }

  function handleEdit(p) {
    setForm({
      nome: p.nome,
      dataNascimento: p.dataNascimento?.split('T')[0],
      carteirinha: p.carteirinha,
      cpf: p.cpf,
    });

    setEditId(p.id);
  }

  return (
    <div>
      <h2>Pacientes</h2>

      <form className="form" onSubmit={handleSubmit}>
        <input
          placeholder="Nome"
          value={form.nome}
          onChange={(e) =>
            setForm({ ...form, nome: e.target.value })
          }
        />

        <input
          type="date"
          value={form.dataNascimento}
          onChange={(e) =>
            setForm({
              ...form,
              dataNascimento: e.target.value,
            })
          }
        />

        <input
          placeholder="Carteirinha"
          value={form.carteirinha}
          onChange={(e) =>
            setForm({
              ...form,
              carteirinha: e.target.value,
            })
          }
        />

        <input
          placeholder="CPF"
          value={form.cpf}
          onChange={(e) =>
            setForm({ ...form, cpf: e.target.value })
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
      ) : pacientes.length === 0 ? (
        <p>Nenhum paciente cadastrado</p>
      ) : (
        <ul className="list">
          {pacientes.map((p) => (
            <li key={p.id}>
              <strong>{p.nome}</strong> - {p.cpf}

              <div style={{ marginTop: 5 }}>
                <button onClick={() => handleEdit(p)}>
                  Editar
                </button>

                <button
                  onClick={() => handleDelete(p.id)}
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