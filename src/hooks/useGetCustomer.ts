import { useState, useEffect } from 'react';

const useGetCustomer = (id: number) => {
    const [customer, setCustomer] = useState<Customer | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchCustomer = async () => {
        setLoading(true);
        try {
          const response = await fetch(`${import.meta.env.VITE_CUSTOMER_SERVICE_URL}/customers/${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (!response.ok) {
            throw new Error('Fehler beim Abrufen des Kunden');
          }
          const data: Customer = await response.json();
          setCustomer(data);
          setLoading(false);
        } catch (error: any) {
            setError(error.message);
          setLoading(false);
        }
      };
  
      fetchCustomer();
    }, [id]);
  
    return { customer, loading, error };
  };
  
  export default useGetCustomer;