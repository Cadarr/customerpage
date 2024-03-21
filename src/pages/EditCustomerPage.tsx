import { useParams } from 'react-router-dom';
import CustomerForm from '../components/features/CustomerForm/CustomerFormComponent';
import useGetCustomer from '../hooks/useGetCustomer';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import { blue } from '@mui/material/colors';
import Alert from '@mui/material/Alert';

const EditCustomerPage = () => {
  const { customerId } = useParams<{customerId: string}>();
  const { customer, loading, error } = useGetCustomer(Number(customerId));

  return (
    <>
              <Container>
              {error && <Alert severity="error">{error}</Alert>}

            {loading && (
              <CircularProgress
                size={24}
                sx={{
                  color: blue[500],
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: "-12px",
                  marginLeft: "-12px",
                }}
              />
            )}
          </Container>
      {customer && <CustomerForm customer={customer}/>}
    </>
  );
};

export default EditCustomerPage;