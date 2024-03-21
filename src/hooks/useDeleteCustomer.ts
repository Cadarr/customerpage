import { useCallback } from 'react';

const useDeleteCustomer = () => {
  return useCallback(async (id: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_CUSTOMER_SERVICE_URL}/customers/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Fehler beim Löschen des Kunden');
      }
      return true;
    } catch (error) {
      console.error(error);
      throw new Error(" " +  error);
    }
  }, []);
};

export default useDeleteCustomer;
