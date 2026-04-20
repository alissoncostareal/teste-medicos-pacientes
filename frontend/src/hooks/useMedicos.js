import { useEffect, useState } from 'react';
import { getMedicos } from '../services/api';

export function useMedicos() {
  const [medicos, setMedicos] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchMedicos() {
    setLoading(true);

    try {
      const data = await getMedicos();
      setMedicos(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMedicos();
  }, []);

  return { medicos, setMedicos, loading, fetchMedicos };
}