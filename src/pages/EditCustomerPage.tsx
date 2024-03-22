import { useParams } from 'react-router-dom';

import Alert from '@mui/material/Alert';
import Container from '@mui/material/Container';
import CustomerForm from '../components/features/CustomerForm/CustomerFormComponent';

import useGetCustomer from '../hooks/useGetCustomer';
import { useTranslation } from 'react-i18next';
import LoadingSymbol from '../components/common/LoadingSymbol';

const EditCustomerPage = () => {
  const { t } = useTranslation();

  const { customerId } = useParams<{customerId: string}>();
  const { customer, loading, error } = useGetCustomer(Number(customerId));

  return (
    <Container>
    {error && <Alert severity="error">{error}</Alert>}
    {loading ? <LoadingSymbol /> : customer ? <CustomerForm customer={customer}/> : <Alert severity="warning">{t("keinKunde")}</Alert>}
  </Container>
  );
};

export default EditCustomerPage;
