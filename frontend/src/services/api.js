const NODE_URL = 'http://localhost:3000/api/v1';
const PHP_API = 'http://localhost:8000/api/v1';

export async function getPacientes() {
  const res = await fetch(`${NODE_URL}/pacientes`);
  return res.json();
}

export async function createPaciente(data) {
  const res = await fetch(`${NODE_URL}/pacientes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || 'Erro ao cadastrar');
  }

  return result;
}

export async function updatePaciente(id, data) {
  const res = await fetch(`${NODE_URL}/pacientes/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function deletePaciente(id) {
  const res = await fetch(`${NODE_URL}/pacientes/${id}`, {
    method: 'DELETE',
  });

  return res.json();
}

export async function getMedicos() {
  const res = await fetch(`${PHP_API}/medicos`);
  return res.json();
}

export async function createMedico(data) {
  const res = await fetch(`${PHP_API}/medicos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function updateMedico(id, data) {
  const res = await fetch(`${PHP_API}/medicos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function deleteMedico(id) {
  const res = await fetch(`${PHP_API}/medicos/${id}`, {
    method: 'DELETE'
  });

  if (res.status === 204) {
    return { success: true };
  }

  if (!res.ok) {
    throw new Error('Erro ao deletar');
  }

  return res.json();
}