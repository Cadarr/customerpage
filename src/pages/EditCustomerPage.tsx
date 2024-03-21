import { useParams } from 'react-router-dom';

import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import CustomerForm from '../components/features/CustomerForm/CustomerFormComponent';

import useGetCustomer from '../hooks/useGetCustomer';

const EditCustomerPage = () => {
  const { customerId } = useParams<{customerId: string}>();
  const { customer, loading, error } = useGetCustomer(Number(customerId));

  return (
    <Container>
    {error && <Alert severity="error">{error}</Alert>}
    {loading ? <CircularProgress /> : customer ? <CustomerForm customer={customer}/> : <Alert severity="warning">Kein Kunde gefunden</Alert>}
  </Container>
  );
};

export default EditCustomerPage;
