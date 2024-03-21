import { useCallback } from 'react';

const useGetCustomers = () => {
  const customers = useCallback(async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_CUSTOMER_SERVICE_URL}/customers`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (!response.ok) {
        throw new Error('Fehler beim Abrufen der Kunden');
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error(error);
      throw new Error(" " +  error);
    }
  }, []);

  return customers;
};

export default useGetCustomers;