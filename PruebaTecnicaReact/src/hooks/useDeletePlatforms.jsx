import { useState } from 'react';

export const UseDeletePlatforms= () => {
  const [error, setError] = useState(null);

  const deletePlatform = async (id) => {
    try {
      
      const response = await fetch(`${import.meta.env.VITE_API_URL}/platforms/${id}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      


      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      console.log('Delete response:', response);

      // Si la eliminación fue exitosa, no se necesita actualizar ningún estado local
      return true;
    } catch (error) {
      console.error('Delete error:', error);
      setError(error);
      return false;
    }
  };

  return { deletePlatform , error };
};
