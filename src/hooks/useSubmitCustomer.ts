import { useCallback } from 'react';

const useSubmitCustomer = () => {
  const submitCustomer = useCallback(async (customerData: any) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_CUSTOMER_SERVICE_URL}/customers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customerData),
      });
      if (!response.ok) {
        throw await response.json();
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }, []);

  return submitCustomer;
};

export default useSubmitCustomer;