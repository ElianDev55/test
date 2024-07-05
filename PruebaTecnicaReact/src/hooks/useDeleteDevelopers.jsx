import { useState } from 'react';

export const UseDeleteDeveloper = () => {
  const [error, setError] = useState(null);

  const deleteDeveloper = async (id) => {
    console.log('Deleting developer with id:', id);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/developers/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Si la eliminación fue exitosa, no se necesita actualizar ningún estado local
      console.log('Se ha eliminado el desarrollador con', id);
      return true;
    } catch (error) {
      console.error('Delete error:', error);
      setError(error);
      return false;
    }
  };

  return { deleteDeveloper, error };
};
