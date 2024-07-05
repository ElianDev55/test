
import { useState, useEffect } from 'react';

export const UseGetVideogames = () => {
  
    const [videogames, setVideogames] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    const fetchData = async () => {
    
      try {
    
        const response = await fetch(`${import.meta.env.VITE_API_URL}/videogames`);
    
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
    
        const jsonData = await response.json();
    
        setVideogames(jsonData);
    
      } 
      
      catch (error) {
      
        setError(error);
      
      } finally {
      
        setLoading(false);
      
      }
    };

    fetchData();
  }, []);

  return { videogames, isLoading, error };
};

