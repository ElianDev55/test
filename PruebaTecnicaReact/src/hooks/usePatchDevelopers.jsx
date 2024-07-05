import { useState } from 'react';

export const useUpdateDeveloper = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateDeveloper = async (developerId, developerData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/developers/${developerId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(developerData)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const jsonData = await response.json();
      return jsonData; // Puedes retornar datos si es necesario después de la actualización

    } catch (error) {
      console.error('Error al actualizar desarrollador:', error);
      setError(error);
      return null; // Maneja el estado de error adecuadamente en tu componente
    } finally {
      setLoading(false);
    }
  };

  return { updateDeveloper, isLoading, error };
};
