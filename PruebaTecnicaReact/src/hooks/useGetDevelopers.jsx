import { useState, useEffect } from 'react';

export const UseGetDevelopers = () => {
  const [developers, setDevelopers] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const fetchData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/developers/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const jsonData = await response.json();
  
    
      setDevelopers(jsonData);
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




  return { developers, isLoading, error };
};

