import { useState, useEffect } from 'react';

export const UseGetPlatforms = () => {
  const [platforms, setPlatforms] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const fetchData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/platforms/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const jsonData = await response.json();

  
      setPlatforms(jsonData);
    } catch (error) {
      console.error('Fetch error:', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  



  useEffect(() => {
    fetchData();
  }, []);



  return { platforms, isLoading, error }
};

