import { useEffect, useState } from 'react';
import { getPacientes } from '../services/api';

export function usePacientes() {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchPacientes() {
    setLoading(true);

    try {
      const data = await getPacientes();
      setPacientes(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setPacientes([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPacientes();
  }, []);

  return { pacientes, loading, fetchPacientes };
}