import { useEffect, useState } from "react";
import CustomerList from "../components/features/CustomersList/CustomerListComponent";
import useGetCustomers from "../hooks/useGetCustomers";
import { Container, Alert } from "@mui/material";
import useDeleteCustomer from "../hooks/useDeleteCustomer";
import { useTranslation } from "react-i18next";
import LoadingSymbol from "../components/common/LoadingSymbol";

const CustomerListPage = () => {
  const { t } = useTranslation();

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
      setCustomers(fetchedCustomers.sort((a: any, b: any) => a.lastName.localeCompare(b.lastName)));
    } catch (error) {
      setError(t("fehlerLadenKunden") + error);
    }
    setLoading(false);
  };

  const handleDeleteCustomer = async (id: string) => {
    setLoading(true);
    try {
      await deleteCustomer(id);
      setCustomers((currentCustomers) => currentCustomers.filter((customer) => customer.id !== id));
    } catch (error) {
      setError(t("fehlerLoeschenKunden") + error);
    }
    setLoading(false);
  };

  return (
    <Container>
      {error && <Alert severity="error">{error}</Alert>}
      {loading ? <LoadingSymbol /> : <CustomerList customers={customers} onDeleteCustomer={handleDeleteCustomer} />}
    </Container>
  );
};

export default CustomerListPage;
