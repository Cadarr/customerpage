import { useEffect, useState } from "react";
import CustomerList from "../components/features/CustomersList/CustomerListComponent";
import useGetCustomers from "../hooks/useGetCustomers";
import { CircularProgress, Container, Alert } from "@mui/material";
import useDeleteCustomer from "../hooks/useDeleteCustomer";

const CustomerListPage = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fetchCustomers = useGetCustomers();
  const deleteCustomer = useDeleteCustomer();

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    setLoading(true);
    try {
      const fetchedCustomers = await fetchCustomers();
      setCustomers(fetchedCustomers.sort((a:any, b:any) => a.lastName.localeCompare(b.lastName)));
    } catch (error) {
      setError("Fehler beim Laden der Kunden: " + error);
    }
    setLoading(false);
  };

  const handleDeleteCustomer = async (id: string) => {
    setLoading(true);
    try {
      await deleteCustomer(id);
      setCustomers((currentCustomers) => currentCustomers.filter((customer) => customer.id !== id));
    } catch (error) {
      setError("Fehler beim Löschen des Kunden: " + error);
    }
    setLoading(false);
  };

  return (
    <Container>
      {error && <Alert severity="error">{error}</Alert>}
      {loading ? <CircularProgress /> : <CustomerList customers={customers} onDeleteCustomer={handleDeleteCustomer} />}
    </Container>
  );
};

export default CustomerListPage;
