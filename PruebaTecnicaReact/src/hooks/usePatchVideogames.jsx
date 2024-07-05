import { useState } from 'react';

export const useUpdateVideoGame = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateVideoGame = async (videoGameId, videoGameData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/videogames/${videoGameId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(videoGameData)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const jsonData = await response.json();
      return jsonData; // Puedes retornar datos si es necesario después de la actualización

    } catch (error) {
      console.error('Error al actualizar videojuego:', error);
      setError(error);
      return null; // Maneja el estado de error adecuadamente en tu componente
    } finally {
      setLoading(false);
    }
  };

  return { updateVideoGame, isLoading, error };
};
