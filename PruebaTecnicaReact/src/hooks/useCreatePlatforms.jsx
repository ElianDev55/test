import { useState } from 'react';

export const useCreatePlatform = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createPlatform = async (platformData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/platforms/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(platformData)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const jsonData = await response.json();
      return jsonData; // You can return data if needed after creation

    } catch (error) {
      console.error('Create platform error:', error);
      setError(error);
      return null; // Handle error state appropriately in your component
    } finally {
      setLoading(false);
    }
  };

  return { createPlatform, isLoading, error };
};
